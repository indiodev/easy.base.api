import { Prisma } from "@database/prisma";
import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";

export function UserFactory(): UserService {
  const userRepository = new UserRepository(Prisma);
  return new UserService(userRepository);
}
