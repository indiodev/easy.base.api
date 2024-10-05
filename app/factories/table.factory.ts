import { Models } from "@config/mongoose/schema";
import { ColumnRepository } from "@repositories/column.repository";
import { RowRepository } from "@repositories/row.repository";
import { TableRepository } from "@repositories/table.repository";
import { TableService } from "@services/table.service";

export function TableFactory(): TableService {
  const rowRepository = new RowRepository();
  const columnRepository = new ColumnRepository(Models.Column);
  const tableRepository = new TableRepository();
  return new TableService(tableRepository, rowRepository, columnRepository);
}
