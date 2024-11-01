import { Request, Response } from "express";

import { RowFactory } from "@factories/row.factory";

export async function Create(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();

  console.log(request.body)

  const result = await factory.create({
    tableId: request.params.id,
    ...request.body,
  });

  
  return response.status(200).json(result);
}
