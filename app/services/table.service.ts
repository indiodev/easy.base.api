import { TableDocument as Table } from "@config/mongoose/schema";
import { ColumnRepository } from "@repositories/column.repository";
import { RowRepository } from "@repositories/row.repository";
import { TableRepository } from "@repositories/table.repository";
import { slugify } from "@util/validators";

export class TableService {
  constructor(
    private tableRepository: TableRepository,
    private rowRepository: RowRepository,
    private columnRepository: ColumnRepository,
  ) {}

  async show(id: string): Promise<Table> {
    const table = await this.tableRepository.findUnique({ _id: id });

    if (!table) throw new Error("Tabela não encontrada.");

    return table;
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
