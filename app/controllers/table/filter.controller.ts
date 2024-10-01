import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function Filter(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = TableFactory();
  const result = await factory.filter({
    id: request.params.id,
    filters: request.body.data,
  });
  return response.status(200).json(result);
}
