import { User } from "@prisma/client";

import { UserRepository } from "@repositories/user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async show(id: string): Promise<User | null> {
    return await this.userRepository.findUnique(id);
  }
}
