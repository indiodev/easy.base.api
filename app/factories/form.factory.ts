import { Models } from "@config/mongoose/schema";
import { Prisma } from "@database/prisma";
import { FormRepository } from "@repositories/form.repository";
import { FormService } from "@services/form.service";

export function FormFactory(): FormService {
  const formRepository = new FormRepository(Models.Form);
  return new FormService(formRepository);
}
