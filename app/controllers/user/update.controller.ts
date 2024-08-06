import { Request, Response } from "express";

import { UserFactory } from "@factories/user.factory";
import { UserUpdateValidator } from "@validators/user.validator";

export async function Update(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = UserFactory();
  const payload = UserUpdateValidator.parse(request.body);
  const result = await factory.update({ ...payload, id: request.params.id });
  return response.status(200).json(result);
}
