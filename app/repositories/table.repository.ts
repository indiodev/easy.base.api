import { Schema, Types } from "mongoose";

import createDynamicModel, {
  generateCollectionName,
  getColumnDataType,
} from "@config/mongoose/functions";
import { Models, TableDocument } from "@config/mongoose/schema";

export class TableRepository {
  async findUnique(
    filter: any,
    sorted?: { slug: string; type: string },
  ): Promise<TableDocument | null> {
    const table = await Models.Table.findOne(filter).exec();

    if (table && table.data_collection && table.schema) {
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

        if (
          relatedTable &&
          relatedTable.data_collection &&
          relatedTable.schema
        ) {
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

      const rows = await CollectionModal.find({})
        .populate(populateFields)
        .exec();

      if (sorted && sorted.slug && sorted.type) {
        const [orderSlug, orderDirection] = [sorted.slug, sorted.type];
        const sortOrder = orderDirection === "asc" ? 1 : -1;

        rows.sort((a: any, b: any) => {
          if (a[orderSlug] < b[orderSlug]) {
            return -1 * sortOrder;
          }
          if (a[orderSlug] > b[orderSlug]) {
            return 1 * sortOrder;
          }
          return 0;
        });
      }

      table.rows = rows.map((row: any) => ({
        _id: row._id,
        value: row,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
    }

    return table;
  }

  async count({
    _id,
    ...query
  }: Partial<
    Record<string, Schema.Types.ObjectId | string | number>
  >): Promise<{ total: number }> {
    const table = await Models.Table.findOne({ _id }).exec();

    if (table && table.data_collection && table.schema) {
      const CollectionModal = createDynamicModel(
        table.data_collection!,
        table.schema,
      );

      const total = await CollectionModal.countDocuments(query).exec();

      return { total };
    }

    return { total: 0 };
  }

  // Encontrar múltiplos documentos com base em um filtro
  async findMany(filter: any = {}): Promise<TableDocument[]> {
    return await Models.Table.find(filter).exec();
  }

  // Criar um novo documento na coleção Table
  async create(payload: any): Promise<TableDocument | null> {
    const { columns, ...rest } = payload;

    const collectionName = await generateCollectionName(rest.identifier);

    const schemaDefinition = columns?.create
      ? columns.create
          .map((item: any) => ({
            [item.slug]:
              item.type == "MULTI_RELATIONAL"
                ? [
                    {
                      type: getColumnDataType(item.type),
                      required: item.config?.required || false,
                      ref: item.config.relation.collection,
                    },
                  ]
                : {
                    type: getColumnDataType(item.type),
                    required: item.config?.required || false,
                    ...(["RELATIONAL"].includes(item.type) && {
                      ref: item.config.relation.collection,
                    }),
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
            [item.slug]:
              item.type == "MULTI_RELATIONAL"
                ? [
                    {
                      type: getColumnDataType(item.type),
                      required: item.config?.required || false,
                      ref: item.config.relation.collection,
                    },
                  ]
                : {
                    type: getColumnDataType(item.type),
                    required: item.config?.required || false,
                    ...(["RELATIONAL"].includes(item.type) && {
                      ref: item.config.relation.collection,
                    }),
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
                _id: column._id,
              }))
            : undefined,
        },
      },
      { new: true }, // Retorna o documento atualizado
    ).exec();

    return updatedTable;
  }
}
