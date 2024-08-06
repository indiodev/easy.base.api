import { PrismaClient, Role } from "@prisma/client";

export class RoleRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }
}
