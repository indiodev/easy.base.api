import { Request, Response } from "express";

import { RoleFactory } from "@factories/role.factory";

export async function List(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RoleFactory();
  const result = await factory.list();
  return response.status(200).json(result);
}
