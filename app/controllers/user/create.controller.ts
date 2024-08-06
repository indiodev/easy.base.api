import { Request, Response } from "express";

import { UserFactory } from "@factories/user.factory";
import { UserCreateValidator } from "@validators/user.validator";

export async function Create(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = UserFactory();
  const payload = UserCreateValidator.parse(request.body);
  const result = await factory.create(payload);
  return response.status(200).json(result);
}
