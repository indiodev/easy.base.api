import { Prisma, PrismaClient } from "@prisma/client";
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

  async update(args: any): Promise<any> {

    const rowWithoutTavbleId = { ...args.data };
    delete rowWithoutTavbleId.tableId;

    return await this.prisma.table.update({
      where: {
        id: args.data.tableId,
      },
      data: {
        rows: {
          updateMany: {
            where: {
              id: args.data.id,
            },
            data: rowWithoutTavbleId,
          },
        },
      },
    });
  }

  async delete(args: any): Promise<any> {
    
    return await this.prisma.table.update({
      where: {
        id: args.data.tableId,
      },
      data: {
        rows: {
          deleteMany: { // Composite types no supported in deleteMany as WhereIn 
            where: {
              id: args.data.id,
            },
          },
        },
      },
    });

  }

  async deleteMany(args: any): Promise<any> {
    // Composite types not supported in deleteMany
    // 
    // return await this.prisma.table.update({
    //   where: {
    //     id: args.data.tableId,
    //   },
    //   data: {
    //     rows: {
    //       deleteMany: {
    //         id: args.data.ids,
    //       },
    //     },
    //   },
    // });
  }
}
