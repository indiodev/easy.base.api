import { Prisma } from "@database/prisma";
import { RoleRepository } from "@repositories/roles.repository";
import { RoleService } from "@services/role.service";

export function RoleFactory(): RoleService {
  const roleRepository = new RoleRepository(Prisma);
  return new RoleService(roleRepository);
}
