import { Request, Response } from "express";

import { ColumnFactory } from "@factories/column.factory";

export async function Update(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = ColumnFactory();
  const result = await factory.update({
    column: request.body.column,
    tableId: request.body.tableId,
  });
  return response.status(200).json(result);
}
