import { Request, Response } from "express";

import { RowFactory } from "@factories/row.factory";

export async function Show(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();
  const result = await factory.show({
    id: request.params.id,
    tableId: request.params.tableId,
  });
  return response.status(200).json(result);
}