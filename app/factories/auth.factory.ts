import { HashProvider } from "@providers/hash.providers";
import { UserRepository } from "@repositories/user.repository";
import { AuthService } from "@services/auth.service";

export function AuthFactory(): AuthService {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  return new AuthService(userRepository, hashProvider);
}
