import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function Delete(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = TableFactory();
  const id = request.params.id;
  const result = await factory.delete(id);
  return response.status(200).json(result);
}
