import { Prisma, PrismaClient, User } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findUnique(args: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return await this.prisma.user.findUnique(args);
  }

  async findFirst(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return await this.prisma.user.findFirst(args);
  }

  async create(args: Prisma.UserCreateArgs): Promise<User> {
    return await this.prisma.user.create(args);
  }

  async findMany(args: Prisma.UserFindManyArgs): Promise<User[]> {
    return await this.prisma.user.findMany(args);
  }

  async update(args: Prisma.UserUpdateArgs): Promise<User> {
    return await this.prisma.user.update(args);
  }

  async delete(args: Prisma.UserDeleteArgs): Promise<User> {
    return await this.prisma.user.delete(args);
  }
}
