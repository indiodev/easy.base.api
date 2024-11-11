import { FilterQuery, UpdateQuery } from "mongoose";

import { Models, RoleDocument } from "@config/mongoose/schema"; 

export class RoleRepository {

  async findUnique(
    filter: FilterQuery<RoleDocument>,
  ): Promise<RoleDocument | null> {
    return await Models.Role.findOne(filter).exec();
  }

  
  async findFirst(
    filter: FilterQuery<RoleDocument>,
  ): Promise<RoleDocument | null> {
    return await Models.Role.findOne(filter).exec();
  }


  async create(roleData: Partial<RoleDocument>): Promise<RoleDocument> {
    const newRole = new Models.Role(roleData);
    return await newRole.save();
  }


  async findMany(
    filter: FilterQuery<RoleDocument> = {},
  ): Promise<RoleDocument[]> {
    return await Models.Role.find(filter).exec();
  }


  async update(
    id: string,
    updateData: UpdateQuery<RoleDocument>,
  ): Promise<RoleDocument | null> {
    return await Models.Role.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
  }


  async delete(id: string): Promise<RoleDocument | null> {
    return await Models.Role.findByIdAndDelete(id).exec();
  }
}
