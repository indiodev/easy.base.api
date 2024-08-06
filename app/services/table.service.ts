import { Table } from "@prisma/client";

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
    const table = await this.tableRepository.findUnique({
      where: { id },
      include: {
        columns: true,
        rows: true,
      },
    });

    if (!table) throw new Error("Tabela não encontrada.");

    return table;
  }

  async list(): Promise<Table[]> {
    return await this.tableRepository.findMany({
      include: {
        columns: true,
        rows: true,
      },
    });
  }

  async create(payload: any): Promise<Table> {
    return await this.tableRepository.create({
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
  }

  async update(payload: any): Promise<Table> {
    return await this.tableRepository.update({
      where: {
        id: payload.id,
      },
      data: {
        identifier: payload.title,
        title: payload.title,
        columns: {
          update: payload.columns?.map((column: any) => {
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
  }

  async delete(id: string): Promise<Table> {
    await this.rowRepository.deleteMany({
      where: {
        tableId: id,
      },
    });

    await this.columnRepository.deleteMany({
      where: {
        tableId: id,
      },
    });

    return await this.tableRepository.delete({
      where: {
        id,
      },
    });
  }
}
