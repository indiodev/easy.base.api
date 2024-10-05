import { Request, Response } from "express";

import { FormFactory } from "@factories/form.factory";

export async function Delete(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = FormFactory();

  const result = await factory.delete(request.body.id);

  return response.status(200).json(result);
}
