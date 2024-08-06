import { Request, Response } from "express";

import { FormFactory } from "@factories/form.factory";

export async function List(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = FormFactory();
  const result = await factory.list();
  return response.status(200).json(result);
}
