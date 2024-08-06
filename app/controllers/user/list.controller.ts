import { Request, Response } from "express";

import { UserFactory } from "@factories/user.factory";

export async function List(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = UserFactory();
  const result = await factory.list();
  return response.status(200).json(result);
}
