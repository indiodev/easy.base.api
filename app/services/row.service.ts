import { RowDocument } from "@config/mongoose/schema";
import { RowRepository } from "@repositories/row.repository";

export class RowService {
  constructor(private rowRepository: RowRepository) {}

  async show({ id, tableId }: any): Promise<RowDocument> {
    return await this.rowRepository.show({
      id,
      tableId,
    });
  }

  async create({ tableId, ...payload }: any): Promise<RowDocument> {
    return await this.rowRepository.create({
      data: {
        value: { ...payload },
      },
      tableId,
    });
  }

  async delete({ tableId, id }: any): Promise<RowDocument> {
    return await this.rowRepository.delete({
      id,
      tableId,
    });
  }

  async update({ tableId, id, ...payload }: any): Promise<RowDocument> {
    return await this.rowRepository.update({
      data: {
        value: { ...payload },
      },
      tableId,
      id: id,
    });
  }
}
