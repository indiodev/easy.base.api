import { Prisma } from "@database/prisma";
import { HashProvider } from "@providers/hash.providers";
import { UserRepository } from "@repositories/user.repository";
import { AuthService } from "@services/auth.service";

export function AuthFactory(): AuthService {
  const userRepository = new UserRepository();
  return new AuthService(userRepository, new HashProvider);
}
