import { UserDocument as User } from "@config/mongoose/schema";

import { UserCreate, UserUpdate } from "@dto/user.dto";
import { UserRepository } from "@repositories/user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async show(id: string): Promise<User> {
    const user = await this.userRepository.findFirst({
      where: { id },
      include: {
        role: true,
        group: true,
        reviews: true,
      },
    });

    if (!user) throw new Error("Usuário não encontrado.");
    // const userWithoutPassword = exclude(user, ["password"]);
    user.password = "";

    return user;
  }

  async list(): Promise<Partial<User>[]> {
    const users = await this.userRepository.findMany({
      include: {
        role: true,
        group: true,
        reviews: true,
      },
    });

    return users.map(({ password, ...user }) => user);
  }

  async create(payload: UserCreate): Promise<Partial<User>> {
    const user = await this.userRepository.create({
      ...payload,
    });
    return user;
  }

  async update({ id, ...payload }: UserUpdate): Promise<Partial<User | null> > {
    const user = await this.userRepository.update(id!, {
        email: payload.email,
        name: payload.name,
        password: payload.password,
      });
    return user;
  }

  async delete(id: string): Promise<User | null> {
    return await this.userRepository.delete(id);
  }
}
