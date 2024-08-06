import { Request, Response } from "express";

import { UserFactory } from "@factories/user.factory";

export async function Delete(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = UserFactory();
  const result = await factory.delete(request.params.id);
  return response.status(200).json(result);
}
