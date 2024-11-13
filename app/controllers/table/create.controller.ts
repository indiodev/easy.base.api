import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function Create(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = TableFactory();
  const result = await factory.create({
    ...request.body,
  });

  return response.status(200).json(result);
}
