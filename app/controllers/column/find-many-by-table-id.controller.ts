import { Request, Response } from "express";

import { ColumnFactory } from "@factories/column.factory";

export async function FindManyByTableId(
  request: Request,
  response: Response,
): Promise<Response> {
  const { tableId } = request.params;
  const factory = ColumnFactory();
  const result = await factory.findManyByTableId(tableId);
  return response.status(200).json(result);
}