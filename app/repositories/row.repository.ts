import mongoose, { Model, Types } from "mongoose";
import { TableDocument } from "@config/mongoose/schema"; // Importar o modelo de tabela
import { Env } from "@config/env";

export class RowRepository {
  constructor(private tableModel: Model<TableDocument>) {
    mongoose.connect(Env.DATABASE_URL)
    .then(() => console.log('Connected!'));
  }

  // Criar uma nova linha associada a uma tabela
  async create(args: any): Promise<TableDocument | null> {
    const rowWithoutTableId = { ...args.data, _id: new Types.ObjectId() }; // Gerar um novo ObjectId para a linha
    delete rowWithoutTableId.tableId; // Remover o campo tableId

    return await this.tableModel.findByIdAndUpdate(
      args.data.tableId,
      {
        $push: { rows: rowWithoutTableId }, // Adicionar a nova linha ao array de rows
      },
      { new: true } // Retornar o documento atualizado
    ).exec();
  }

  // Atualizar uma linha existente
  async update(args: any): Promise<TableDocument | null> {
    const rowWithoutTableId = { ...args.data };
    delete rowWithoutTableId.tableId; // Remover o campo tableId

    return await this.tableModel.findOneAndUpdate(
      { _id: args.data.tableId, "rows._id": args.data.id }, // Filtrar pela tabela e linha
      {
        $set: { "rows.$": rowWithoutTableId }, // Atualizar a linha correspondente
      },
      { new: true } // Retornar o documento atualizado
    ).exec();
  }

  // Deletar uma linha existente
  async delete(args: any): Promise<TableDocument | null> {
    return await this.tableModel.findByIdAndUpdate(
      args.data.tableId,
      {
        $pull: { rows: { _id: args.data.id } }, // Remover a linha com o id fornecido
      },
      { new: true } // Retornar o documento atualizado
    ).exec();
  }

  // Deletar múltiplas linhas
  async deleteMany(args: any): Promise<TableDocument | null> {
    return await this.tableModel.findByIdAndUpdate(
      args.data.tableId,
      {
        $pull: { rows: { _id: { $in: args.data.ids } } }, // Remover múltiplas linhas com base nos IDs
      },
      { new: true } // Retornar o documento atualizado
    ).exec();
  }
}
