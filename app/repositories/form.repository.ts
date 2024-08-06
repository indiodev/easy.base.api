import { Form, Prisma, PrismaClient } from "@prisma/client";

export class FormRepository {
  constructor(private prisma: PrismaClient) {}

  async create(args: Prisma.FormCreateArgs): Promise<Form> {
    return await this.prisma.form.create(args);
  }

  async findMany(args: Prisma.FormFindManyArgs): Promise<Form[]> {
    return await this.prisma.form.findMany(args);
  }

  async findUnique(args: Prisma.FormFindUniqueArgs): Promise<Form | null> {
    return await this.prisma.form.findUnique(args);
  }

  async findFirst(args: Prisma.FormFindFirstArgs): Promise<Form | null> {
    return await this.prisma.form.findFirst(args);
  }

  async update(args: Prisma.FormUpdateArgs): Promise<Form> {
    return await this.prisma.form.update(args);
  }

  async delete(args: Prisma.FormDeleteArgs): Promise<Form> {
    return await this.prisma.form.delete(args);
  }
}
