import mongoose, { Model } from "mongoose";

import { Env } from "@config/env";
import { FormDocument, Models } from "@config/mongoose/schema";
const { Form } = Models;
type FormType = typeof Form;

export class FormRepository {
  constructor(private formModel: Model<FormDocument>) {
    mongoose
      .connect(Env.DATABASE_URL)
      .then(() => console.info("Database Connected!"));
  } // Model do Mongoose injetado

  // Método para criar um novo formulário
  async create(data: Partial<FormType>): Promise<FormDocument> {
    const newForm = new this.formModel(data);
    return await newForm.save(); // Salva no MongoDB
  }

  // Método para encontrar múltiplos formulários
  async findMany(filter: any = {}): Promise<FormDocument[]> {
    return await this.formModel.find(filter).exec(); // Retorna uma lista de formulários
  }

  // Método para encontrar um formulário por ID ou outra condição única
  async findUnique(filter: any): Promise<FormDocument | null> {
    return await this.formModel.findOne(filter).exec(); // Encontra um formulário único baseado no filtro
  }

  // Método para encontrar o primeiro formulário que satisfaz a condição
  async findFirst(filter: any): Promise<FormDocument | null> {
    return await this.formModel.findOne(filter).exec(); // Similar ao findUnique em Mongoose
  }

  // Método para atualizar um formulário por ID
  async update(
    id: string,
    data: Partial<FormType>,
  ): Promise<FormDocument | null> {
    return await this.formModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec(); // Retorna o formulário atualizado
  }

  // Método para excluir um formulário por ID
  async delete(id: string): Promise<FormDocument | null> {
    return await this.formModel.findByIdAndDelete(id).exec(); // Remove e retorna o formulário excluído
  }
}
