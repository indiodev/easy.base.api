import { Prisma, PrismaClient } from "@prisma/client";

export class ColumnRepository {
  constructor(private prisma: PrismaClient) {}

  async delete(args: any ): Promise<any> {
    return await this.prisma.table.update({
      where: {
        id: args.data.tableId,
      },
      data: {
        columns: {
          deleteMany: {
            where: args.data.id,
          },
        },
      },
    });
  }
}
