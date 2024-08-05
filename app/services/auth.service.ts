import { User } from "@prisma/client";

import { AuthLogin, AuthRegister } from "@dto/auth.dto";
import { UserRepository } from "@repositories/user.repository";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(payload: AuthLogin): Promise<User> {
    const user = await this.userRepository.findFirst({
      where: {
        email: payload.email,
        password: payload.password,
      },
    });

    if (!user) throw new Error("Credenciais inválidas.");
    user.password = "";

    return user;
  }

  async register(payload: AuthRegister): Promise<User> {
    const user = await this.userRepository.create({
      data: payload,
    });

    if (!user) throw new Error("Erro ao criar usuário.");

    return user;
  }
}
