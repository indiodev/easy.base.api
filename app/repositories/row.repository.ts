import mongoose, { Model, Types } from "mongoose";
import { TableDocument, Models } from "@config/mongoose/schema"; 
import { Env } from "@config/env";
import createDynamicModel from "@config/mongoose/functions";

export interface IRowRepository{
  data?: {
    value: any,
  },
  id?: string,
  tableId: string
} 

export class RowRepository {

  async create(args: IRowRepository): Promise<any | null> {
    const rowWithoutTableId = { ...args.data!.value, _id: new Types.ObjectId() }; 
    delete rowWithoutTableId.tableId; 

    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    return await CollectionModel.create(rowWithoutTableId);
  }

  async update(args: IRowRepository): Promise<any | null> {
    console.log(args)
    const rowWithoutTableId = { ...args.data?.value };
    
    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    return await CollectionModel.findByIdAndUpdate(
      args.id,
      rowWithoutTableId,
      { new: true } 
    ).exec();

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

    return createDynamicModel(collectionName, schema) as Model<mongoose.Document>;
  }

  
}
