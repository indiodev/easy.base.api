import { Prisma } from "@database/prisma";
import { UserRepository } from "@repositories/user.repository";
import { AuthService } from "@services/auth.service";

export function AuthFactory(): AuthService {
  const userRepository = new UserRepository(Prisma);
  return new AuthService(userRepository);
}
