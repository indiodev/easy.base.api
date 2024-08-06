import { Role } from "@prisma/client";

import { RoleRepository } from "@repositories/roles.repository";

export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async list(): Promise<Role[]> {
    return await this.roleRepository.findMany();
  }
}
