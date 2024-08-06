import { Prisma } from "@database/prisma";
import { FormRepository } from "@repositories/form.repository";
import { FormService } from "@services/form.service";

export function FormFactory(): FormService {
  const formRepository = new FormRepository(Prisma);
  return new FormService(formRepository);
}
