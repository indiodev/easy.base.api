import mongoose, { Model } from 'mongoose';
import { RoleDocument } from "@config/mongoose/schema"; // Importando o modelo Role
import { Env } from '@config/env';

export class RoleRepository {
  constructor(private roleModel: Model<RoleDocument>) {
    mongoose.connect(Env.DATABASE_URL)
    .then(() => console.log('Connected!'));
  }

  // Método para buscar múltiplos roles
  async findMany(): Promise<RoleDocument[]> {
    return await this.roleModel.find().exec(); // `find` retorna todos os registros
  }
}