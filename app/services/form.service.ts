import { FormDocument as Form } from "@config/mongoose/schema";
import { FormRepository } from "@repositories/form.repository";

export class FormService {
  constructor(private formRepository: FormRepository) {}

  async create(payload: any): Promise<Form> {
    return await this.formRepository.create({
      ...payload,
    });
  }

  async list(): Promise<Form[]> {
    return await this.formRepository.findMany({
      include: {
        table: true,
        created_by: true,
      },
    });
  }

  async show(id: string): Promise<Form> {
    const form = await this.formRepository.findFirst({
      where: { id },
      include: {
        table: true,
        created_by: true,
      },
    });

    if (!form) throw new Error("Formulário não encontrado.");

    return form;
  }

  async delete(id: string): Promise<Form | null> {
    return await this.formRepository.delete(id);
  }

  async update({ id, ...payload }: any): Promise<Form | null> {
    return await this.formRepository.update(id, payload);
  }
}
