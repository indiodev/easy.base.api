import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function List(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = TableFactory();
  const result = await factory.list();
  return response.status(200).json(result);
}
