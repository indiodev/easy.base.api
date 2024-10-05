import { Models } from "@config/mongoose/schema";
import { FormRepository } from "@repositories/form.repository";
import { FormService } from "@services/form.service";

export function FormFactory(): FormService {
  const formRepository = new FormRepository(Models.Form);
  return new FormService(formRepository);
}
