import { UserDocument as User, Models } from "@config/mongoose/schema";

import { AuthLogin, AuthRegister } from "@dto/auth.dto";
import { UserRepository } from "@repositories/user.repository";

export class AuthService {

  async login(payload: AuthLogin): Promise<User | null> {
    
    const user = await Models.User.findOne({
      email: payload.email,
      password: payload.password,
    });


    if (!user) throw new Error("Credenciais inválidas.");
      user.password = "";

    return user;
  }

  async register(payload: AuthRegister): Promise<User> {
    const user = await Models.User.create({
      ...payload,
    });

    if (!user) throw new Error("Erro ao criar usuário.");

    return user;
  }
}
