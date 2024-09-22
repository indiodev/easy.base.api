import mongoose, { Model, FilterQuery, UpdateQuery } from "mongoose";
import { UserDocument } from "@config/mongoose/schema"; // Importar o modelo e documento User
import { Env } from "@config/env";

export class UserRepository {
  constructor(private userModel: Model<UserDocument>) {
    mongoose.connect(Env.DATABASE_URL)
    .then(() => console.log('Connected!'));
  }

  // Encontra um único usuário por um filtro (similar ao `findUnique`)
  async findUnique(filter: FilterQuery<UserDocument>): Promise<UserDocument | null> {
    return await this.userModel.findOne(filter).exec();
  }

  // Encontra o primeiro usuário que atenda aos critérios (similar ao `findFirst`)
  async findFirst(filter: FilterQuery<UserDocument>): Promise<UserDocument | null> {
    return await this.userModel.findOne(filter).exec();
  }

  // Cria um novo usuário (similar ao `create`)
  async create(userData: Partial<UserDocument>): Promise<UserDocument> {
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  // Encontra múltiplos usuários com base em um filtro (similar ao `findMany`)
  async findMany(filter: FilterQuery<UserDocument> = {}): Promise<UserDocument[]> {
    return await this.userModel.find(filter).exec();
  }

  // Atualiza um usuário com base no ID e dados de atualização (similar ao `update`)
  async update(id: string, updateData: UpdateQuery<UserDocument>): Promise<UserDocument | null> {
    return await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Exclui um usuário com base no ID (similar ao `delete`)
  async delete(id: string): Promise<UserDocument | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
