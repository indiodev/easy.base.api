import { console } from "inspector";

import { TableDocument as Table } from "@config/mongoose/schema";
import { ColumnRepository } from "@repositories/column.repository";
import { RowRepository } from "@repositories/row.repository";
import { TableRepository } from "@repositories/table.repository";
import { accentInsensitiveRegex, slugify } from "@util/validators";

export class TableService {
  constructor(
    private tableRepository: TableRepository,
    private rowRepository: RowRepository,
    private columnRepository: ColumnRepository,
  ) {}

  async show({
    id,
    page,
    limit,
    ...query
  }: {
    id: string;
    [key: string]: string | number | boolean;
    page: number;
    limit: number;
  }): Promise<Table> {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log({ id, page, limit, query });
    const hasQuery = Object.keys(query).length > 0;

    if (!hasQuery) {
      const table = await this.tableRepository.findUnique({
        _id: id,
        page,
        limit,
      });

      if (!table) throw new Error("Tabela não encontrada.");

      const { total } = await this.tableRepository.count({
        _id: id,
      });

      console.log({ id, page, limit, query, total });

      return { table, total };
    }

    const caseInsensitiveQuery: Record<string, any> = {} as Record<string, any>;

    for (const key in query) {
      const regexValue = accentInsensitiveRegex(
        String(query[key]).toLowerCase(),
      );
      const value = query[key];
      if (typeof value === "string")
        caseInsensitiveQuery[key] = {
          $regex: `.*${regexValue}.*`,
          $options: "i",
        };
      else caseInsensitiveQuery[key] = value;
    }

    const table = await this.tableRepository.findUnique({
      _id: id,
      ...caseInsensitiveQuery,
      page,
      limit,
    });

    if (!table) throw new Error("Tabela não encontrada.");

    const { total } = await this.tableRepository.count({
      _id: id,
      ...caseInsensitiveQuery,
    });

    console.log({ id, page, limit, query, total });

    return { table, total };
  }

  async list(): Promise<Table[]> {
    const tables = await this.tableRepository.findMany();
    return tables;
  }

  async filter(payload: any): Promise<Table[]> {
    const tables = await this.tableRepository.findMany({
      _id: payload._id,
    });

    return tables;
  }

  async create(payload: any): Promise<Table> {
    const createdTable = await this.tableRepository.create({
      data: {
        identifier: payload.title,
        title: payload.title,
        columns: {
          create: payload.columns?.map((column: any) => {
            return {
              title: column.title,
              type: column.type,
              slug: slugify(column.title),
              config: column.config || null,
            };
          }),
        },
      },
    });

    if (!createdTable) throw new Error("Failed to create table.");

    return createdTable;
  }

  async update(payload: any): Promise<Table | null> {
    const payloudWithoutColumns = payload;
    const payloadColumns = payload.columns;
    delete payloudWithoutColumns.columns;
    delete payloudWithoutColumns.id;
    delete payloudWithoutColumns.rows;

    return await this.tableRepository.update(payload._id, {
      ...payloudWithoutColumns,
      columns: {
        set: payloadColumns?.map((column: any) => {
          return {
            id: column.id,
            title: column.title,
            type: column.type,
            slug: slugify(column.title),
            config: column.config || null,
          };
        }),
      },
    });
  }

  async delete(id: string): Promise<Table | null> {
    await this.rowRepository.deleteMany({
      tableId: id,
    });

    return await this.tableRepository.delete(id);
  }
}
