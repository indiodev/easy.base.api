
import mongoose, { Schema, Document, Model } from 'mongoose';


export const createDynamicModel = (
    collectionName: string,
    schemaDefinition: Record<string, any>
): Model<Document> => {

    // Verify if the model already exists
    if (mongoose.models[collectionName]) {
      return mongoose.models[collectionName] as Model<Document>;
    }
  
    const schema = new Schema(schemaDefinition, { timestamps: true });

    const model = mongoose.model<Document>(collectionName, schema);

    return model;
  };
  
export default createDynamicModel;


// To be implemented - Usage example

// const DynamicModel = createDynamicModel(collectionName, schemaDefinition);

// const newDocument = await new DynamicModel(documentData).save();