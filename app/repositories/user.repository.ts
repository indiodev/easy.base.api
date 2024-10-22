import { FilterQuery, UpdateQuery } from "mongoose";

import { Models, UserDocument } from "@config/mongoose/schema"; // Importar o modelo e documento User

export class UserRepository {
  // Encontra um único usuário por um filtro (similar ao `findUnique`)
  async findUnique(
    filter: FilterQuery<UserDocument>,
  ): Promise<UserDocument | null> {
    return await Models.User.findOne(filter).exec();
  }

  // Encontra o primeiro usuário que atenda aos critérios (similar ao `findFirst`)
  async findFirst(
    filter: FilterQuery<UserDocument>,
  ): Promise<UserDocument | null> {
    return await Models.User.findOne(filter).exec();
  }

  // Cria um novo usuário (similar ao `create`)
  async create(userData: Partial<UserDocument>): Promise<UserDocument> {
    const newUser = new Models.User(userData);
    return await newUser.save();
  }

  // Encontra múltiplos usuários com base em um filtro (similar ao `findMany`)
  async findMany(
    filter: FilterQuery<UserDocument> = {},
  ): Promise<UserDocument[]> {
    return await Models.User.find(filter).select("-password").exec();
  }

  // Atualiza um usuário com base no ID e dados de atualização (similar ao `update`)
  async update(
    id: string,
    updateData: UpdateQuery<UserDocument>,
  ): Promise<UserDocument | null> {
    return await Models.User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
  }

  // Exclui um usuário com base no ID (similar ao `delete`)
  async delete(id: string): Promise<UserDocument | null> {
    return await Models.User.findByIdAndDelete(id).exec();
  }
}
