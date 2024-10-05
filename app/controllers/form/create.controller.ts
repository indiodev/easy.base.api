import { Request, Response } from "express";

import { FormFactory } from "@factories/form.factory";

export async function Create(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = FormFactory();
  const result = await factory.create({
    ...request.body,
    id: request.body.id,
    tableId: request.body.tableId,
    userId: request.body.userId,
  });
  return response.status(200).json(result);
}
