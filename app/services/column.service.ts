import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

import { ColumnDocument as Column } from "@config/mongoose/schema";
import { ApplicationException } from "@exceptions/application.exception";
import { TableRepository } from "@repositories/table.repository";
import { slugify } from "@util/validators";

export class ColumnService {
  constructor(private tableRepository: TableRepository) {}

  async create(payload: {
    tableId: string;
    column: Partial<Column>;
  }): Promise<void> {
    const table = await this.tableRepository.findUnique({
      _id: payload.tableId,
    });

    const column = {
      _id: new ObjectId().toString(),
      title: payload.column.title!,
      identifier: payload.column.title!,
      type: payload.column.type,
      slug: slugify(payload.column.title!),
      config: payload.column.config,
    };

    const old =
      table?.columns?.map(({ _id, title, type, slug, config }) => ({
        _id,
        title,
        type,
        slug,
        config,
      })) || [];

    const exist = old.find(({ slug }) => slug === column.slug);

    if (exist)
      throw new ApplicationException({
        code: 400,
        message: "Coluna já existe.",
        cause: "COLUMN_ALREADY_EXISTS",
      });

    await this.tableRepository.update(payload.tableId, {
      columns: [...old, column],
    });
  }

  async update(payload: {
    tableId: string;
    column: Partial<Column>;
  }): Promise<void> {
    const table = await this.tableRepository.findUnique({
      _id: payload.tableId,
    });

    const exist = table?.columns?.find(
      (c) => JSON.stringify(c._id) === JSON.stringify(payload.column._id),
    );

    if (!exist)
      throw new ApplicationException({
        code: 400,
        message: "Coluna não encontrada.",
        cause: "COLUMN_NOT_FOUND",
      });

    const columns = table?.columns.map((c) => {
      console.log(c);
      if (JSON.stringify(c._id) === JSON.stringify(payload?.column?._id))
        return {
          // ...c,
          ...payload.column,
        };

      return c;
    });

    await this.tableRepository.update(payload.tableId, {
      columns,
    });
  }

  async show(query: {
    tableId: string;
    columnId: Schema.Types.ObjectId;
  }): Promise<Column> {
    const table = await this.tableRepository.findUnique({ _id: query.tableId });

    if (!table)
      throw new ApplicationException({
        code: 404,
        message: "Tabela não encontrada.",
        cause: "TABLE_NOT_FOUND",
      });

    // const column = table.columns.find((column) => column._id === query.columnId);

    const column = table.columns.find(
      (column) => column._id.toString() === query.columnId.toString(),
    );

    if (!column)
      throw new ApplicationException({
        code: 404,
        message: "Coluna não encontrada.",
        cause: "COLUMN_NOT_FOUND",
      });

    return column;
  }

  async findManyByTableId(tableId: string): Promise<Partial<Column>[]> {
    const table = await this.tableRepository.findUnique({ _id: tableId });

    if (!table) throw new Error("Tabela não encontrada.");

    return table?.columns || [];
  }
}
