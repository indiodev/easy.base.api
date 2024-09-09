import { Prisma, PrismaClient, Row } from "@prisma/client";
import { ObjectId } from "mongodb";

export class RowRepository {
  constructor(private prisma: PrismaClient) { }

  async create(args: any): Promise<any> {

    const rowWithoutTavbleId = { ...args.data, id: new ObjectId().toString() };
    delete rowWithoutTavbleId.tableId;

    return await this.prisma.table.update({
      where: {
        id: args.data.tableId,
      },
      data: {
        rows: {
          push: rowWithoutTavbleId,
        },
      },
    });
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
