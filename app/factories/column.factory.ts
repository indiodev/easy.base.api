import { TableRepository } from "@repositories/table.repository";
import { ColumnService } from "@services/column.service";

export function ColumnFactory(): ColumnService {
  const tableRepository = new TableRepository();

  return new ColumnService(tableRepository);
}
