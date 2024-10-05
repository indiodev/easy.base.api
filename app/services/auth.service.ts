import { sign } from "jsonwebtoken";

import { Models, UserDocument as User } from "@config/mongoose/schema";
import { AuthLogin, AuthRegister } from "@dto/auth.dto";
import { ApplicationException } from "@exceptions/application.exception";
import { HashProvider } from "@providers/hash.providers";
import { UserRepository } from "@repositories/user.repository";
import { Authentication } from "@util/authentication";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProvider,
  ) {}

  async login(payload: AuthLogin): Promise<{ token: string }> {
    const user = await Models.User.findOne({
      email: payload.email,
    });

    const hash = new HashProvider();

    if (!user)
      throw new ApplicationException({
        code: 401,
        message: "Usuário não encontrado.",
        cause: "USER_NOT_FOUND",
      });

    const passwordMatched = await hash.compare(
      payload.password,
      user?.password,
    );

    if (!passwordMatched)
      throw new ApplicationException({
        code: 401,
        message: "Credenciais invalidas.",
        cause: "CREDENTIALS_INVALID",
      });

    const token = sign({}, Authentication.JWT.SECRET, {
      subject: user.id,
      expiresIn: Authentication.JWT.EXPIRES_IN,
    });

    user.password = "";

    return { token };
  }

  async register({ password, ...payload }: AuthRegister): Promise<User> {
    const hash = new HashProvider();

    const passwordHashed = await hash.generate(password);

    const user = await Models.User.create({
      ...payload,
      password: passwordHashed,
    });

    if (!user)
      throw new ApplicationException({
        message: "Erro ao registrar o usuário.",
        code: 400,
        cause: "REGISTER_ERROR",
      });

    return user;
  }
}
