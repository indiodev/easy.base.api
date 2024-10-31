import { Response } from "express";

import { UserFactory } from "@factories/user.factory";
import { CustomRequest } from "@middleware/authentication.middleware";

export async function List(
  request: CustomRequest,
  response: Response,
): Promise<Response> {
  const factory = UserFactory();
  const result = await factory.list();
  return response.status(200).json(result);
}
