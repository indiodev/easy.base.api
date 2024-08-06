import { Request, Response } from "express";

import { RowFactory } from "@factories/row.factory";

export async function Delete(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();
  const id = request.body.id;
  const result = await factory.delete(id);
  return response.status(200).json(result);
}
