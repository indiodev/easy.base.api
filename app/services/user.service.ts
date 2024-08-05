import { User } from "@prisma/client";

import { UserRepository } from "@repositories/user.repository";
import { exclude } from "@util/validators";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async show(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findUnique({
      where: { id },
      // include: {
      //   role: true,
      //   group: true,
      //   reviews: true,
      // },
    });

    if (!user) throw new Error("Usuário não encontrado.");
    const userWithoutPassword = exclude(user, ["password"]);

    return userWithoutPassword;
  }
}
