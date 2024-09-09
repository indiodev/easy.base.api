import { Prisma, PrismaClient, Table } from "@prisma/client";
import { ObjectId } from "mongodb";

export class TableRepository {
  constructor(private prisma: PrismaClient) { }

  async findUnique(args: Prisma.TableFindUniqueArgs): Promise<Table | null> {
    return await this.prisma.table.findUnique(args);
  }

  async findMany(args: Prisma.TableFindManyArgs): Promise<Table[]> {
    return await this.prisma.table.findMany(args);
  }

  async create(args: any): Promise<Table> { // Temporary any

    return await this.prisma.table.create({
      data: {
        // Normal relation
        ...args.data,
        // Composite type
        columns: {
          set: args.data.columns.create.map((column: any) => ({ ...column, id: new ObjectId().toString() })),
        },
      },
    });
  }

  async delete(args: Prisma.TableDeleteArgs): Promise<Table> {
    return await this.prisma.table.delete(args);
  }

  async update(args: Prisma.TableUpdateArgs): Promise<Table> {
    return await this.prisma.table.update(args);
  }
}
