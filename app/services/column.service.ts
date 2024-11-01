import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

import { ColumnDocument as Column, TableDocument } from "@config/mongoose/schema";
import { ApplicationException } from "@exceptions/application.exception";
import { TableRepository } from "@repositories/table.repository";
import { slugify } from "@util/validators";

export class ColumnService {
  constructor(private tableRepository: TableRepository) {}

  async create(payload: {
    tableId: string;
    column: Partial<Column>;
  }): Promise<void> {
    const table = await this.tableRepository.findUnique({
      _id: payload.tableId,
    });
  
    if (!table) {
      throw new ApplicationException({
        code: 404,
        message: "Tabela não encontrada.",
        cause: "TABLE_NOT_FOUND",
      });
    }
  
    const column = {
      _id: new ObjectId().toString(),
      title: payload.column.title!,
      identifier: payload.column.title!,
      type: payload.column.type,
      slug: slugify(payload.column.title!),
      config: payload?.column?.config || {},
    };
  
    const oldColumns =
      table?.columns?.map(({ _id, title, type, slug, config }) => ({
        _id,
        title,
        type,
        slug,
        config,
      })) || [];
  
    const exist = oldColumns.find(({ slug }) => slug === column.slug);
  
    if (exist) {
      throw new ApplicationException({
        code: 400,
        message: "Coluna já existe.",
        cause: "COLUMN_ALREADY_EXISTS",
      });
    }
  
    // Update 
    await this.tableRepository.update(payload.tableId, {
      columns: [...oldColumns, column],
    });
  }
  

  async update(payload: {
    tableId: string;
    column: Partial<Column>;
  }): Promise<void> {
    const table = await this.tableRepository.findUnique({
      _id: payload.tableId,
    });

    if (!table)
      throw new ApplicationException({
        code: 404,
        message: "Tabela não encontrada.",
        cause: "COLUMN_NOT_FOUND",
      });

    const column = table.columns.find(
      (column) => column._id.toString() === payload.column?._id?.toString(),
    );

    if (!column)
      throw new ApplicationException({
        code: 404,
        message: "Coluna não encontrada.",
        cause: "COLUMN_NOT_FOUND",
      });

    const newCol = <Column>payload.column;
    newCol.slug = slugify(newCol.title!);

    const columns = table.columns.map((c) => {
      if (c._id.toString() === payload?.column?._id?.toString()) return newCol;

      return c;
    });

    await this.tableRepository.update(payload.tableId, {
      columns,
    });
  }

  async show(query: {
    tableId: string;
    columnId: Schema.Types.ObjectId;
  }): Promise<Column> {
    const table = await this.tableRepository.findUnique({ _id: query.tableId });

    if (!table)
      throw new ApplicationException({
        code: 404,
        message: "Tabela não encontrada.",
        cause: "TABLE_NOT_FOUND",
      });

    const column = table.columns.find(
      (column) => column._id.toString() === query.columnId.toString(),
    );

    if (!column)
      throw new ApplicationException({
        code: 404,
        message: "Coluna não encontrada.",
        cause: "COLUMN_NOT_FOUND",
      });

    return column;
  }

  async findManyByTableId(tableId: string): Promise<Partial<Column>[]> {
    const table = await this.tableRepository.findUnique({ _id: tableId });
    if (!table)
      throw new ApplicationException({
        code: 404,
        message: "Coluna não encontrada.",
        cause: "COLUMN_NOT_FOUND",
      });

    return table.columns || [];
  }

  async createJoinCollectionInDatabase(
    collectionName: string,
    table: TableDocument,
    targetTable: TableDocument
  ): Promise<string> {
    // Define the join collection schema fields
    const joinSchemaFields: any = {};
  
    joinSchemaFields[table._id.toString()] = {
      type: mongoose.Schema.Types.ObjectId,
      ref: table._id,
      required: true,
    };
  
    joinSchemaFields[targetTable._id.toString()] = {
      type: mongoose.Schema.Types.ObjectId,
      ref: targetTable._id,
      required: true,
    };
  
    // Create the join collection schema
    const joinSchema = new mongoose.Schema(joinSchemaFields);
  
    // Register the join collection model
    mongoose.model(collectionName, joinSchema);
  
    // Create the join collection
    await mongoose.connection.createCollection(collectionName);

    return collectionName
  }
}
