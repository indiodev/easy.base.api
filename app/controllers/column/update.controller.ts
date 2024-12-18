import { Request, Response } from "express";

import { ColumnFactory } from "@factories/column.factory";

export async function Update(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = ColumnFactory();

  try {
    await factory.update({
      column: request.body.column,
      tableId: request.body.tableId,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).json(error);
  }

  return response.status(200).send();
}
