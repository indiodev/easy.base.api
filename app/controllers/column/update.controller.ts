import { Request, Response } from "express";

import { ColumnFactory } from "@factories/column.factory";

export async function Update(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = ColumnFactory();
  await factory.update({
    column: { id: request.params.id, ...request.body.column },
    tableId: request.body.tableId,
  });
  return response.status(200).send();
}
