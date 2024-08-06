import { Prisma } from "@database/prisma";
import { RowRepository } from "@repositories/row.repository";
import { RowService } from "@services/row.service";

export function RowFactory(): RowService {
  const rowRepository = new RowRepository(Prisma);
  return new RowService(rowRepository);
}
