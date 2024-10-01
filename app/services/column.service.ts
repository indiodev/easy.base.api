import { Column } from "@prisma/client";
import { ObjectId } from "mongodb";

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
      where: {
        id: payload.tableId,
      },
    });

    const column = {
      id: new ObjectId().toString(),
      title: payload.column.title!,
      type: payload.column.type,
      slug: slugify(payload.column.title!),
      config: payload.column.config,
    };

    const old =
      table?.columns?.map(({ id, title, type, slug, config }) => ({
        id,
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

    await this.tableRepository.update({
      where: {
        id: payload.tableId,
      },
      data: {
        columns: {
          set: [...old, column],
        },
      },
    });
  }

  async update(payload: { tableId: string; column: Partial<Column> }) {
    const table = await this.tableRepository.findUnique({
      where: {
        id: payload.tableId,
      },
    });

    const exist = table?.columns?.find((c) => c.id === payload.column.id);

    if (!exist)
      throw new ApplicationException({
        code: 400,
        message: "Coluna não encontrada.",
        cause: "COLUMN_NOT_FOUND",
      });

    const columns = table?.columns.map((c) => {
      if (c.id === payload?.column?.id)
        return {
          ...c,
          ...payload.column,
        };

      return c;
    });

    await this.tableRepository.update({
      where: {
        id: payload.tableId,
      },
      data: {
        columns: {
          set: columns,
        },
      },
    });
  }

  async show(query: { tableId: string; columnId: string }): Promise<Column> {
    const table = await this.tableRepository.findUnique({
      where: {
        id: query.tableId,
      },
    });

    if (!table)
      throw new ApplicationException({
        code: 404,
        message: "Tabela não encontrada.",
        cause: "TABLE_NOT_FOUND",
      });

    const column = table.columns.find((column) => column.id === query.columnId);

    if (!column)
      throw new ApplicationException({
        code: 404,
        message: "Coluna não encontrada.",
        cause: "COLUMN_NOT_FOUND",
      });

    return column;
  }

  async findManyByTableId(tableId: string): Promise<Partial<Column>[]> {
    const table = await this.tableRepository.findUnique({
      where: { id: tableId },
    });

    if (!table) throw new Error("Tabela não encontrada.");

    return table?.columns || [];
  }
}