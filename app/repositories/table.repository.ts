import mongoose, { Model, Types } from "mongoose";
import { TableDocument } from "@config/mongoose/schema"; // Importando o modelo Mongoose
import { Env } from "@config/env";

export class TableRepository {
  constructor(private tableModel: Model<TableDocument>) {
    mongoose.connect(Env.DATABASE_URL)
    .then(() => console.log('Connected!'));
  }

  // Encontrar um único documento por ID ou qualquer outro critério
  async findUnique(filter: any): Promise<TableDocument | null> {
    return await this.tableModel.findOne(filter).exec();
  }

  // Encontrar múltiplos documentos com base em um filtro
  async findMany(filter: any = {}): Promise<TableDocument[]> {
    return await this.tableModel.find(filter).exec();
  }

  // Criar um novo documento na coleção Table
  async create(args: any): Promise<TableDocument> {
    const { columns, ...rest } = args.data;

    const newTable = new this.tableModel({
      ...rest,
      // Relacionamento com as colunas
      columns: columns.create.map((column: any) => ({
        ...column,
        _id: new Types.ObjectId(), // Gerar um novo ObjectId para as colunas
      })),
    });

    return await newTable.save(); // Salva no MongoDB
  }

  // Excluir um documento da coleção Table
  async delete(id: string): Promise<TableDocument | null> {
    return await this.tableModel.findByIdAndDelete(id).exec(); // Exclui por ID
  }

  // Atualizar um documento existente da coleção Table
  async update(id: string, updateData: any): Promise<TableDocument | null> {
    const { columns, ...rest } = updateData.data;

    const updatedTable = await this.tableModel.findByIdAndUpdate(
      id,
      {
        ...rest,
        // Se houver colunas para atualizar
        $set: {
          columns: columns ? columns.map((column: any) => ({
            ...column,
            _id: column._id || new Types.ObjectId(),
          })) : undefined,
        },
      },
      { new: true } // Retorna o documento atualizado
    ).exec();

    return updatedTable;
  }
}
