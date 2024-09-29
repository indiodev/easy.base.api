import { Row } from "@prisma/client";

import { RowRepository } from "@repositories/row.repository";

export class RowService {
  constructor(private rowRepository: RowRepository) {}

  async create({ tableId, ...payload }: any): Promise<Row> {
    return await this.rowRepository.create({
      data: {
        value: { ...payload },
      },
      tableId,
    });
  }

  async delete({ tableId, id }: any): Promise<Row> {
    return await this.rowRepository.delete({
      id,
      tableId
    });
  }

  async update({ tableId, id, ...payload }: any): Promise<Row> {
    return await this.rowRepository.update({
      data: {
        value: { ...payload },
      },
      tableId,
      id: id,
    });
  }
}
