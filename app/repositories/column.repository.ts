import { Prisma, PrismaClient } from "@prisma/client";

export class ColumnRepository {
  constructor(private prisma: PrismaClient) {}

  async deleteMany(
    args: Prisma.ColumnDeleteManyArgs,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.column.deleteMany(args);
  }
}
