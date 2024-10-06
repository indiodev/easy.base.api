import mongoose, { Model, Types } from "mongoose";

import createDynamicModel from "@config/mongoose/functions";
import { Models, TableDocument } from "@config/mongoose/schema";

export interface IRowRepository {
  data?: {
    value: any;
  };
  id?: string;
  tableId: string;
}

export class RowRepository {
  async show(args: IRowRepository): Promise<any | null> {
    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    const row = (await CollectionModel.findById(args.id).exec()) as any;

    if (!row) {
      return null;
    }

    const returnRow = {
      _id: row._id,
      value: row,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };

    return returnRow;
  }

  async create(args: IRowRepository): Promise<any | null> {
    const rowWithoutTableId = {
      ...args.data!.value,
      _id: new Types.ObjectId(),
    };
    delete rowWithoutTableId.tableId;

    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    return await CollectionModel.create(rowWithoutTableId);
  }

  async update(args: IRowRepository): Promise<any | null> {
    const rowWithoutTableId = { ...args.data?.value };

    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    return await CollectionModel.findByIdAndUpdate(args.id, rowWithoutTableId, {
      new: true,
    }).exec();
  }

  async delete(args: IRowRepository): Promise<any | null> {
    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    return await CollectionModel.findByIdAndDelete(args.id).exec();
  }

  async deleteMany(args: IRowRepository): Promise<any | null> {
    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    return await CollectionModel.deleteMany(args.data).exec();
  }

  private getCollectionModel(table: TableDocument): Model<mongoose.Document> {
    const collectionName = table.data_collection;
    if (!collectionName) {
      throw new Error("Collection name not found");
    }

    const schema = table.schema;
    if (!schema) {
      throw new Error("Collection schema not found");
    }

    return createDynamicModel(
      collectionName,
      schema,
    ) as Model<mongoose.Document>;
  }
}
