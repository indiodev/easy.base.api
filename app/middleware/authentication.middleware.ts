import { Request as ExpressRequest, NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { ApplicationException } from "@exceptions/application.exception";
import { Authentication } from "@util/authentication";
type Role = "MASTER" | "ADMIN" | "MANAGER" | "REGISTERED";
export interface CustomRequest extends ExpressRequest {
  user?: {
    id: string;
    role: Role;
  };
}

export async function AuthenticationMiddleware(
  request: CustomRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const token =
    request.cookies["token"] ??
    request.headers.authorization?.replace("Bearer", "").trim();

  if (!token)
    throw new ApplicationException({
      message: "Acesso não autorizado.",
      cause: "UNAUTHORIZED",
      code: 401,
    });

  try {
    const decoded = verify(token, Authentication.JWT.SECRET) as {
      sub: string;
      role: string;
    };

    request.user = {
      id: decoded.sub,
      role: decoded.role as Role,
    };

    next();
  } catch (error) {
    next(error);
  }
}
