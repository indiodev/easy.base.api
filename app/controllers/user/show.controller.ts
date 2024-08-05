import { Request, Response } from "express";

import { UserFactory } from "@factories/user.factory";

export async function Show(
  request: Request,
  response: Response
): Promise<Response> {
  const factory = UserFactory();
  // const payload = AuthRegisterValidator.parse(request.body);
  const result = await factory.show(request.params.id);
  return response.status(200).json(result);
}
