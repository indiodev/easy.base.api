import { Prisma, PrismaClient, Table } from "@prisma/client";

export class TableRepository {
  constructor(private prisma: PrismaClient) {}

  async findUnique(args: Prisma.TableFindUniqueArgs): Promise<Table | null> {
    return await this.prisma.table.findUnique(args);
  }

  async findMany(args: Prisma.TableFindManyArgs): Promise<Table[]> {
    return await this.prisma.table.findMany(args);
  }

  async create(args: Prisma.TableCreateArgs): Promise<Table> {
    return await this.prisma.table.create(args);
  }

  async delete(args: Prisma.TableDeleteArgs): Promise<Table> {
    return await this.prisma.table.delete(args);
  }

  async update(args: Prisma.TableUpdateArgs): Promise<Table> {
    return await this.prisma.table.update(args);
  }
}
