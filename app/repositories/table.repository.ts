import { Schema, Types } from "mongoose";

import createDynamicModel, {
  generateCollectionName,
  getColumnDataType,
} from "@config/mongoose/functions";
import { Models, TableDocument } from "@config/mongoose/schema";
import { extractOrder, extractQuery } from "@util/table";

export class TableRepository {
  async findUnique({
    _id,
    page,
    per_page,
    ...query
  }: any): Promise<TableDocument | null> {
    const _query = extractQuery(query);
    const _order = extractOrder(query);

    const table = await Models.Table.findOne({ _id }).exec();

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

      const skip = (page - 1) * per_page;

      const rows = await CollectionModal.find(_query)
        .sort(_order)
        .populate(populateFields)
        .skip(skip)
        .limit(per_page)
        .exec();

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

    let schema: Record<string, any> | null = null;

    if (columns && Array.isArray(columns) && columns.length > 0) {
      const mapping = columns.map((item: any) => {
        if (item.type === "FILE") {
          return {
            [item.slug]: {
              type: getColumnDataType(item.type),
              required: item.config?.required || false,
            },
          };
        }

        if (item.type === "DROPDOWN") {
          return {
            [item.slug]: [
              {
                type: getColumnDataType(item.type),
                required: item.config?.required || false,
              },
            ],
          };
        }

        if (item.type === "MULTI_RELATIONAL") {
          return {
            [item.slug]: [
              {
                type: getColumnDataType(item.type),
                required: item.config?.required || false,
                ref: item?.config?.relation?.collection ?? undefined,
              },
            ],
          };
        }

        if (item.type == "RELATIONAL") {
          return {
            [item.slug]: {
              type: getColumnDataType(item.type),
              required: item.config?.required || false,
              ref: item?.config?.relation?.collection ?? undefined,
            },
          };
        }

        return {
          [item.slug]: {
            type: getColumnDataType(item.type),
            required: item.config?.required || false,
          },
        };
      });

      schema = mapping.reduce(
        (acc: any, curr: any) => ({ ...acc, ...curr }),
        {},
      );
    }

    const newTable = new Models.Table({
      ...rest,
      data_collection: collectionName,
      schema: schema,
      // Relacionamento com as colunas
      columns: columns?.map((column: any) => ({
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

    let schema: Record<string, any> | null = null;

    if (columns && Array.isArray(columns) && columns.length > 0) {
      const mapping = columns.map((item: any) => {
        if (item.type === "FILE") {
          return {
            [item.slug]: {
              type: getColumnDataType(item.type),
              required: item.config?.required || false,
            },
          };
        }

        if (item.type === "DROPDOWN") {
          return {
            [item.slug]: [
              {
                type: getColumnDataType(item.type),
                required: item.config?.required || false,
              },
            ],
          };
        }

        if (item.type === "MULTI_RELATIONAL") {
          return {
            [item.slug]: [
              {
                type: getColumnDataType(item.type),
                required: item.config?.required || false,
                ref: item?.config?.relation?.collection ?? undefined,
              },
            ],
          };
        }

        if (item.type == "RELATIONAL") {
          return {
            [item.slug]: {
              type: getColumnDataType(item.type),
              required: item.config?.required || false,
              ref: item?.config?.relation?.collection ?? undefined,
            },
          };
        }

        return {
          [item.slug]: {
            type: getColumnDataType(item.type),
            required: item.config?.required || false,
          },
        };
      });

      schema = mapping.reduce(
        (acc: any, curr: any) => ({ ...acc, ...curr }),
        {},
      );
    }

    const updatedTable = await Models.Table.findByIdAndUpdate(
      id,
      {
        ...rest,
        schema,
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
