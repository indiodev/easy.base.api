import { Request, Response } from "express";

import { Env } from "@config/env";
import { AuthFactory } from "@factories/auth.factory";
import { AuthLoginValidator } from "@validators/auth.validator";

export async function Login(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = AuthFactory();
  const payload = AuthLoginValidator.parse(request.body);
  const result = await factory.login(payload);

  return response
    .cookie("token", result.token, {
      httpOnly: true,
      secure: Env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 1000,
    })
    .status(200)
    .json(result);
}
