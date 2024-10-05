import mongoose, { Document, Model, Schema } from "mongoose";
import slugify from "slugify";

import { Models } from "./schema";

export const generateCollectionName = async (
  tableName: string,
): Promise<string> => {
  const slugifiedName = slugify(tableName, { lower: true });
  const collectionSize = await Models.Table.countDocuments();
  return `${slugifiedName}_${collectionSize}_data`;
};

export const getColumnDataType = (type: string): any => {
  switch (type) {
    case "SHORT_TEXT":
      return "String";
    case "LONG_TEXT":
      return "String";
    case "DROPDOWN":
      return "String";
    case "BOOLEAN":
      return "Boolean";
    case "DATE":
      return "Date";
    default:
      return "String";
  }
};

export const createDynamicModel = (
  collectionName: string,
  schemaDefinition: Record<string, any>,
): Model<Document> => {
  // Verify if the model already exists
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName] as Model<Document>;
  }

  schemaDefinition._id = { type: mongoose.Schema.Types.ObjectId, auto: true };

  const schema = new Schema(schemaDefinition, { timestamps: true });

  const model = mongoose.model<Document>(
    collectionName,
    schema,
    collectionName,
  );

  return model;
};

export default createDynamicModel;

// To be implemented - Usage example

// const DynamicModel = createDynamicModel(collectionName, schemaDefinition);

// const newDocument = await new DynamicModel(documentData).save();

//  Example data
//  {
//     "collectionName": "Products",
//     "schemaDefinition": {
//       "name": { "type": "String", "required": true },
//       "price": { "type": "Number", "required": true },
//       "inStock": { "type": "Boolean", "default": true }
//     },
//     "documentData": {
//       "name": "Notebook",
//       "price": 1500
//     }
//   }
