import { Models } from "@config/mongoose/schema";
import { RoleRepository } from "@repositories/roles.repository";
import { RoleService } from "@services/role.service";

export function RoleFactory(): RoleService {
  const roleRepository = new RoleRepository(Models.Role);
  return new RoleService(roleRepository);
}
