import { RowDocument } from "@config/mongoose/schema";
import { RowRepository } from "@repositories/row.repository";

export class RowService {
  constructor(private rowRepository: RowRepository) {}

  async findManyByCollection(query: {
    data_collection: string;
    columnId: string;
  }): Promise<any> {
    return await this.rowRepository.findManyByCollection(query);
  }

  async show({ id, tableId }: any): Promise<RowDocument> {
    return await this.rowRepository.show({
      id,
      tableId,
    });
  }

  async search({ tableId, query }: any): Promise<RowDocument[]> {
    return await this.rowRepository.search({ searchText: query, tableId });
  }

  async create({ tableId, ...payload }: any): Promise<RowDocument> {
    return await this.rowRepository.create({
      // data: {
      //   value: {  },
      // },
      tableId,
      ...payload,
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
      tableId,
      id,
      ...payload,
    });
  }
}
