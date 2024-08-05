import { Request, Response } from "express";

import { AuthFactory } from "@factories/auth.factory";
import { AuthLoginValidator } from "@validators/auth.validator";

export async function Login(
  request: Request,
  response: Response
): Promise<Response> {
  const factory = AuthFactory();
  const payload = AuthLoginValidator.parse(request.body);
  const result = await factory.login(payload);
  return response.status(200).json(result);
}
