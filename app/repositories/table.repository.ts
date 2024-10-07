import { Types } from "mongoose";

import createDynamicModel, {
  generateCollectionName,
  getColumnDataType,
} from "@config/mongoose/functions";
import { Models, TableDocument } from "@config/mongoose/schema"; // Importando o modelo Mongoose

export class TableRepository {
  // Encontrar um único documento por ID ou qualquer outro critério
  // WIP - Work in progress
  async findUnique(filter: any): Promise<TableDocument | null> {
    const table = await Models.Table.findOne(filter).exec();

    if (table && table.data_collection && table.schema) {
      const CollectionModal = createDynamicModel(
        table.data_collection!,
        table.schema,
      );
      const rows = await CollectionModal.find().exec();
      table.rows = rows.map((row: any) => ({
        _id: row._id,
        value: row,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
    }

    return table;
  }

  // Encontrar múltiplos documentos com base em um filtro
  async findMany(filter: any = {}): Promise<TableDocument[]> {
    return await Models.Table.find(filter).exec();
  }

  // Criar um novo documento na coleção Table
  async create(args: any): Promise<TableDocument | null> {
    const { columns, ...rest } = args.data;

    const collectionName = await generateCollectionName(rest.identifier);

    const schemaDefinition = columns.create
      ? columns.create
          .map((item: any) => ({
            [item.slug]: {
              type: getColumnDataType(item.type),
              required: item.config?.required || false,
            },
          }))
          .reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {})
      : null;

    const newTable = new Models.Table({
      ...rest,
      data_collection: collectionName,
      schema: schemaDefinition,
      // Relacionamento com as colunas
      columns: columns?.create?.map((column: any) => ({
        ...column,
        _id: new Types.ObjectId(), // Gerar um novo ObjectId para as colunas
      })),
    });

    return await newTable.save(); // Salva no MongoDB
  }

  // Excluir um documento da coleção Table
  async delete(id: string): Promise<TableDocument | null> {
    return await Models.Table.findByIdAndDelete(id).exec(); // Exclui por ID
  }

  // Atualizar um documento existente da coleção Table
  async update(id: string, updateData: any): Promise<TableDocument | null> {
    const { columns, ...rest } = updateData;

    const schemaDefinition = columns
      ? columns
          .map((item: any) => ({
            [item.slug]: {
              type: getColumnDataType(item.type),
              required: item.config?.required || false,
            },
          }))
          .reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {})
      : null;

    const updatedTable = await Models.Table.findByIdAndUpdate(
      id,
      {
        ...rest,
        schema: schemaDefinition,
        // Se houver colunas para atualizar
        $set: {
          columns: columns
            ? columns.map((column: any) => ({
                ...column,
                _id: column._id || new Types.ObjectId(),
              }))
            : undefined,
        },
      },
      { new: true }, // Retorna o documento atualizado
    ).exec();

    return updatedTable;
  }
}
