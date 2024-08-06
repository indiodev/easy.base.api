import { Request, Response } from "express";

import { RowFactory } from "@factories/row.factory";

export async function Create(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();
  const result = await factory.create({
    tableId: request.params.id,
    ...request.body.data,
  });
  return response.status(200).json(result);
}
