import { faker } from "@faker-js/faker";
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
  async findManyByCollection(query: {
    data_collection: string;
    columnId: string;
  }): Promise<any> {
    try {
      const table = await Models.Table.findOne({
        data_collection: query.data_collection,
      }).exec();

      if (!table) {
        throw new Error("Table not found");
      }

      const CollectionModel = this.getCollectionModel(table);

      const column = table.columns.find(
        (column) =>
          JSON.stringify(column._id) === JSON.stringify(query.columnId),
      );

      if (!column) {
        throw new Error("Relational column not found");
      }

      return await CollectionModel.find({}, { [column.slug!]: 1 }).exec();
    } catch (error) {
      console.error(error);
    }
  }
  async show(args: IRowRepository): Promise<any | null> {
    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    const relationalColumns = table.columns.filter((column) =>
      ["RELATIONAL", "MULTI_RELATIONAL"].includes(column.type!),
    );

    const populateFields = relationalColumns
      .map((column) => column.slug)
      .join(" ");

    const row = (await CollectionModel.findById(args.id)
      .populate(populateFields)
      .exec()) as any;

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

  async create({ tableId, ...payload }: any): Promise<any | null> {
    const data = {
      _id: new Types.ObjectId(),
      ...payload,
    };

    // delete rowWithoutTableId.tableId;

    const table = await Models.Table.findById(tableId).exec();

    if (!table) {
      throw new Error("Table not found");
    }

    const columns = table.columns;

    for (const key in data) {
      const column = columns.find((col) => col.slug === key);

      if (column && column.type === "MULTI_RELATIONAL") {
        data[key] = data[key].split(",");
      }
    }

    const CollectionModel = this.getCollectionModel(table);

    console.log(data);
    return await CollectionModel.create(data);
  }

  async update({ tableId, id, ...payload }: any): Promise<any | null> {
    const data = { ...payload };

    const table = await Models.Table.findById(tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const columns = table.columns;

    for (const key in payload) {
      const column = columns.find((col) => col.slug === key);
      if (column && column.type === "MULTI_RELATIONAL") {
        data[key] = data[key].split(",");
      }
    }

    const CollectionModel = this.getCollectionModel(table);
    console.log({
      data,
      id,
    });

    return await CollectionModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
  }

  async createMany(args: { tableId: string; rows: number }): Promise<any[]> {
    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const columns = table.columns;

    const generatedRows = [];

    for (let i = 0; i < args.rows; i++) {
      const row: any = {};

      for await (const column of columns) {
        if (column.type === "SHORT_TEXT") {
          if (column.slug) {
            row[column.slug] = faker.commerce.productName();
          }
        } else if (["MULTI_RELATIONAL", "RELATIONAL"].includes(column.type!)) {
          const relatedTable = await Models.Table.findOne({
            data_collection: column.config?.relation?.collection,
          }).exec();

          if (!relatedTable) {
            throw new Error("Related table not found");
          }

          const RelatedCollectionModel = this.getCollectionModel(relatedTable);

          const relatedRows = await RelatedCollectionModel.find().exec();

          if (relatedRows.length > 0) {
            const randomIndex = Math.floor(Math.random() * relatedRows.length);
            const relatedRow = relatedRows[randomIndex] as any;
            row[column.slug!] = relatedRow._id.toString();
          }
        }
      }

      generatedRows.push(row);
    }

    const CollectionModel = this.getCollectionModel(table);

    return await CollectionModel.insertMany(generatedRows);
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

  async search(args: { tableId: string; searchText: string }): Promise<any[]> {
    const table = await Models.Table.findById(args.tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const relationalColumns = table.columns.filter((column) =>
      ["RELATIONAL", "MULTI_RELATIONAL"].includes(column.type!),
    );

    const populateFields = relationalColumns
      .map((column) => column.slug)
      .join(" ");

    const CollectionModel = this.getCollectionModel(table);

    const searchQuery = {
      $text: { $search: args.searchText },
    };

    const rows = await CollectionModel.find(searchQuery)
      .populate(populateFields)
      .exec();

    return rows.map((row: any) => ({
      _id: row._id,
      value: row,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
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
