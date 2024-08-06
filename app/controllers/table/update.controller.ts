import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function Update(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = TableFactory();
  const result = await factory.update({
    id: request.params.id,
    ...request.body.data,
  });
  return response.status(200).json(result);
}
