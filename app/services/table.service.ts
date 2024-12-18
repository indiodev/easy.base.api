import { TableDocument as Table } from "@config/mongoose/schema";
import { RowRepository } from "@repositories/row.repository";
import { TableRepository } from "@repositories/table.repository";

export class TableService {
  constructor(
    private tableRepository: TableRepository,
    private rowRepository: RowRepository,
  ) {}

  async show({
    id,
    page,
    per_page,
    order,
    ...query
  }: Partial<Record<string, string | number> | any>): Promise<{
    table: Table;
    meta: Record<string, number | string>;
  }> {
    const hasQuery = Object.keys(query).length > 0;

    if (!hasQuery) {
      const table = await this.tableRepository.findUnique({
        _id: id,
        // order,
        page: Number(page),
        per_page: Number(per_page),
        ...query,
      });

      if (!table) throw new Error("Tabela não encontrada.");

      const { total } = await this.tableRepository.count({
        _id: id,
      });

      const last_page = Math.ceil(total / Number(per_page));

      return {
        table,
        meta: {
          total,
          per_page: Number(per_page),
          page: Number(page),
          last_page,
          first_page: 1,
        },
      };
    }

    const table = await this.tableRepository.findUnique({
      _id: id,
      page: Number(page),
      per_page: Number(per_page),
      ...query,
    });

    if (!table) throw new Error("Tabela não encontrada.");

    const { total } = await this.tableRepository.count({
      _id: id,
      // ...caseInsensitiveQuery,
    });

    const last_page = Math.ceil(total / Number(per_page));

    return {
      table,
      meta: {
        total,
        per_page: Number(per_page),
        page: Number(page),
        last_page,
        first_page: 1,
      },
    };
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
      identifier: payload.title,
      config: payload.config || null,
      description: payload.description || null,
      logo: payload.logo || null,
      title: payload.title,
    });

    if (!createdTable) throw new Error("Failed to create table.");

    return createdTable;
  }
  //
  async update(payload: any): Promise<Table | null> {
    // console
    return await this.tableRepository.update(payload.id, {
      ...payload,
    });
  }

  async delete(id: string): Promise<Table | null> {
    await this.rowRepository.deleteMany({
      tableId: id,
    });

    return await this.tableRepository.delete(id);
  }

  async seed(tableId: string, rows: number): Promise<void> {
    await this.rowRepository.createMany({ tableId, rows });
  }
}
