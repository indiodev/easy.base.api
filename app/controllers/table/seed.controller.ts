import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function Seed(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = TableFactory();
  // const rows = request.body.rows || 100;
  const rows = 1000;
  const result = await factory.seed(request.params.id, rows);

  return response.status(200).json(result);
}
