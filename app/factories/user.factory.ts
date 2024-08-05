import { UserController } from "@controllers/user.controller";
import { Prisma } from "@database/prisma";
import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";

export function UserFactory(): UserController {
  const userRepository = new UserRepository(Prisma);
  const userService = new UserService(userRepository);
  return new UserController(userService);
}
