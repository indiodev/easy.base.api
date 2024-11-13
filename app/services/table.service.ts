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
        // page: Number(page),
        // per_page: Number(per_page),
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

    // const caseInsensitiveQuery: Record<string, any> = {} as Record<string, any>;

    // for (const key in query) {
    //   const regexValue = accentInsensitiveRegex(
    //     String(query[key]).toLowerCase(),
    //   );
    //   const value = query[key];
    //   if (typeof value === "string")
    //     caseInsensitiveQuery[key] = {
    //       $regex: `.*${regexValue}.*`,
    //       $options: "i",
    //     };
    //   else caseInsensitiveQuery[key] = value;
    // }

    const table = await this.tableRepository.findUnique({
      _id: id,
      // page: Number(page),
      // per_page: Number(per_page),
      // ...caseInsensitiveQuery,
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

  async update(payload: any): Promise<Table | null> {
    return await this.tableRepository.update(payload.id, {
      identifier: payload.title,
      config: payload.config || null,
      description: payload.description || null,
      logo: payload.logo || null,
      title: payload.title,
    });
  }

  async delete(id: string): Promise<Table | null> {
    await this.rowRepository.deleteMany({
      tableId: id,
    });

    return await this.tableRepository.delete(id);
  }
}
