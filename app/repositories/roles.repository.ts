import { Model } from 'mongoose';
import { RoleDocument } from "@config/mongoose/schema"; // Importando o modelo Role

export class RoleRepository {
  constructor(private roleModel: Model<RoleDocument>) {}

  // Método para buscar múltiplos roles
  async findMany(): Promise<RoleDocument[]> {
    return await this.roleModel.find().exec(); // `find` retorna todos os registros
  }
}