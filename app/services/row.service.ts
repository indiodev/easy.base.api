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

  async paginate({
    id,
    page,
    per_page,
    ...query
  }: Record<string, any>): Promise<{
    data: RowDocument[];
    meta: Record<string, number | string>;
  }> {
    const rows = await this.rowRepository.paginate({
      _id: id,
      page: Number(page),
      per_page: Number(per_page),
      ...query,
    });

    const { total } = await this.rowRepository.count({
      _id: id,
      ...query,
    });

    const last_page = Math.ceil(total / Number(per_page));

    return {
      data: rows,
      meta: {
        total,
        per_page: Number(per_page),
        page: Number(page),
        last_page,
        first_page: 1,
      },
    };
  }

  async search({ tableId, query }: any): Promise<RowDocument[]> {
    return await this.rowRepository.search({ searchText: query, tableId });
  }

  async create({ tableId, ...payload }: any): Promise<RowDocument> {
    return await this.rowRepository.create({
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
