import { Request, Response } from "express";

import { FormFactory } from "@factories/form.factory";

export async function Update(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = FormFactory();
  const id = request.body.id;
  delete request.body.id;
  const result = await factory.update({ id, ...request.body });
  return response.status(200).json(result);
}
