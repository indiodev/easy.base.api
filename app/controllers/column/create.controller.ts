import { Request, Response } from "express";

import { ColumnFactory } from "@factories/column.factory";

export async function Create(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = ColumnFactory();
  await factory.create({
    column: request.body.column,
    tableId: request.body.tableId,
  });
  return response.status(200).send();
}
