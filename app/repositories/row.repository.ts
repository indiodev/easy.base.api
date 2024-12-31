import { faker } from "@faker-js/faker";
import mongoose, { Model, Types } from "mongoose";

import createDynamicModel from "@config/mongoose/functions";
import { Models, RowDocument, TableDocument } from "@config/mongoose/schema";
import { extractOrder, extractQuery } from "@util/table";

export interface IRowRepository {
  data?: {
    value: any;
  };
  id?: string;
  tableId: string;
}

export class RowRepository {
  async paginate({
    _id,
    page,
    per_page,
    ...query
  }: any): Promise<RowDocument[]> {
    const _query = extractQuery(query);
    const _order = extractOrder(query);

    const table = await Models.Table.findOne({ _id }).exec();

    if (!table || !table.data_collection || !table.schema) return [];

    const CollectionModal = createDynamicModel(
      table.data_collection!,
      table.schema,
    );

    const relationalColumns = table.columns.filter((column) =>
      ["RELATIONAL", "MULTI_RELATIONAL"].includes(column.type!),
    );

    let registeredColumns = [];

    for await (const column of relationalColumns) {
      const relatedTable = await Models.Table.findOne({
        data_collection: column.config.relation.collection,
      }).exec();

      if (relatedTable && relatedTable.data_collection && relatedTable.schema) {
        console.info(
          "relatedTable.schema",
          JSON.stringify(relatedTable.schema, null, 2),
        );

        const TemporaryDynamicModel = createDynamicModel(
          relatedTable.data_collection,
          relatedTable.schema,
        );
        registeredColumns.push(TemporaryDynamicModel);
      }
    }

    const populateFields = relationalColumns
      .flatMap((column) => column.slug)
      .join(" ");

    const skip = (page - 1) * per_page;

    console.info(populateFields);

    console.info(_query);

    const rows = await CollectionModal.find<RowDocument>(_query)
      .sort(_order)
      .populate(populateFields)
      .skip(skip)
      .limit(per_page)
      .exec();

    return rows;
  }

  async count({
    _id,
    ...query
  }: Partial<Record<string, any>>): Promise<{ total: number }> {
    const table = await Models.Table.findOne({ _id }).exec();

    if (!table || !table.data_collection || !table.schema) return { total: 0 };

    const CollectionModal = createDynamicModel(
      table.data_collection!,
      table.schema,
    );

    const total = await CollectionModal.countDocuments(query).exec();

    return { total };
  }

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

    const row = await CollectionModel.findById(args.id)
      .populate(populateFields)
      .exec();

    if (!row) {
      return null;
    }

    return row;
  }

  async create({ tableId, ...payload }: any): Promise<any | null> {
    const table = await Models.Table.findById(tableId).exec();

    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

    return await CollectionModel.create({
      _id: new Types.ObjectId(),
      ...payload,
    });
  }

  async update({ tableId, id, ...payload }: any): Promise<any | null> {
    const data = { ...payload };

    const table = await Models.Table.findById(tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }

    const CollectionModel = this.getCollectionModel(table);

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

    return rows;
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
