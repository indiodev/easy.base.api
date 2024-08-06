import { Prisma } from "@database/prisma";
import { ColumnRepository } from "@repositories/column.repository";
import { RowRepository } from "@repositories/row.repository";
import { TableRepository } from "@repositories/table.repository";
import { TableService } from "@services/table.service";

export function TableFactory(): TableService {
  const rowRepository = new RowRepository(Prisma);
  const columnRepository = new ColumnRepository(Prisma);
  const tableRepository = new TableRepository(Prisma);
  return new TableService(tableRepository, rowRepository, columnRepository);
}
