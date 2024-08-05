import { Request, Response } from "express";

import { AuthFactory } from "@factories/auth.factory";
import { AuthRegisterValidator } from "@validators/auth.validator";

export async function Register(
  request: Request,
  response: Response
): Promise<Response> {
  const factory = AuthFactory();
  const payload = AuthRegisterValidator.parse(request.body);
  const result = await factory.register(payload);
  return response.status(200).json(result);
}
