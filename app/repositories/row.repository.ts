import { Prisma, PrismaClient, Row } from "@prisma/client";

export class RowRepository {
  constructor(private prisma: PrismaClient) {}

  async create(args: Prisma.RowCreateArgs): Promise<Row> {
    return await this.prisma.row.create(args);
  }

  async update(args: Prisma.RowUpdateArgs): Promise<Row> {
    return await this.prisma.row.update(args);
  }

  async delete(args: Prisma.RowDeleteArgs): Promise<Row> {
    return await this.prisma.row.delete(args);
  }

  async deleteMany(
    args: Prisma.RowDeleteManyArgs,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.row.deleteMany(args);
  }
}
