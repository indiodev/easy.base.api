import { Row } from "@prisma/client";

import { RowRepository } from "@repositories/row.repository";

export class RowService {
  constructor(private rowRepository: RowRepository) {}

  async create({ tableId, ...payload }: any): Promise<Row> {
    return await this.rowRepository.create({
      data: {
        value: { ...payload },
        tableId,
      },
    });
  }

  async delete(id: string): Promise<Row> {
    return await this.rowRepository.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, ...payload }: any): Promise<Row> {
    return await this.rowRepository.update({
      where: {
        id,
      },
      data: {
        value: payload,
      },
    });
  }
}
