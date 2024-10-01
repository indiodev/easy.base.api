import { Request, Response } from "express";

import { ColumnFactory } from "@factories/column.factory";

export async function Show(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = ColumnFactory();
  const result = await factory.show({
    columnId: request.params._id as any,
    tableId: request.params.tableId,
  });
  return response.status(200).json(result);
}