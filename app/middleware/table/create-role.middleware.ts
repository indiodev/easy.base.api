import { NextFunction, Response } from "express";

import { ApplicationException } from "@exceptions/application.exception";
import { CustomRequest } from "@middleware/authentication.middleware";

export async function TableCreateRoleMiddleware(
  request: CustomRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const create_table_permission_roles = ["MASTER", "MANAGER"];

  if (!request.user)
    throw new ApplicationException({
      message: "Acesso nao autorizado.",
      cause: "UNAUTHORIZED",
      code: 401,
    });

  if (!create_table_permission_roles.includes(request.user.role)) {
    throw new ApplicationException({
      message: "Acesso nao autorizado.",
      cause: "UNAUTHORIZED",
      code: 401,
    });
  }

  next();
}
