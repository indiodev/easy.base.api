import { Document, Model } from "mongoose";

import createDynamicModel from "@config/mongoose/functions";
import { Models, TableDocument } from "@config/mongoose/schema"; // Importar o modelo e documento User

interface Interaction {
  userId: string;
  value: any;
  timestamp: Date;
}

export class InteractionRepository {
  async update(
    tableId: string,
    columnId: String,
    rowId: string,
    value: any,
    userId: string,
  ): Promise<any | null> {
    const table = await Models.Table.findById(tableId).exec();
    if (!table) {
      throw new Error("Table not found");
    }
    const Model = await this.getCollectionModel(table);

    if (!Model) {
      throw new Error(`Model for table ${tableId} not found`);
    }

    const row = (await Model.findById(rowId).exec()) as any;
    if (!row) {
      throw new Error("Row not found");
    }

    const column = table.columns.find(
      (column) => column._id.toString() === columnId,
    );

    if (!column || !column.slug) {
      throw new Error("Column not found");
    }

    const columnName = column.slug as string;

    if (!columnName) {
      throw new Error("Column not found");
    }

    const userInteraction = (row[columnName] as any)?.find(
      (field: any) => field.userId === userId,
    );

    const newInteraction: Interaction = {
      userId,
      value,
      timestamp: new Date(),
    };

    if (!userInteraction) {
      row[columnName].push(newInteraction);
      await row.save();
      return row;
    }

    const interactionIndex = row[columnName].findIndex(
      (field: any) => field.userId === userId,
    );
    if (interactionIndex !== -1) {
      row[columnName][interactionIndex].value = value;
      row[columnName][interactionIndex].timestamp = new Date();
      await row.save();
    }
  }

  private getCollectionModel(table: TableDocument): Model<Document> {
    const collectionName = table.data_collection;
    if (!collectionName) {
      throw new Error("Collection name not found");
    }

    const schema = table.schema;
    if (!schema) {
      throw new Error("Collection schema not found");
    }

    return createDynamicModel(collectionName, schema) as Model<Document>;
  }
}
