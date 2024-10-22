import { Request, Response } from "express";

import { RowFactory } from "@factories/row.factory";

export async function search(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();
  const result = await factory.search({
    tableId: request.params.tableId,
    query: request.body.query,
  });
  return response.status(200).json(result);
}