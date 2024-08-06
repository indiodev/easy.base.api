import { Request, Response } from "express";

import { FormFactory } from "@factories/form.factory";

export async function Show(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = FormFactory();
  const result = await factory.show(request.params.id);
  return response.status(200).json(result);
}
