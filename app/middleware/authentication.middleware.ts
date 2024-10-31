import { Request as ExpressRequest, NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { ApplicationException } from "@exceptions/application.exception";
import { Authentication } from "@util/authentication";
export interface CustomRequest extends ExpressRequest {
  user?: {
    id: string;
  };
}

export async function AuthenticationMiddleware(
  request: CustomRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const token = request.headers.authorization?.replace("Bearer", "").trim();

  if (!token)
    throw new ApplicationException({
      message: "Acesso não autorizado.",
      cause: "UNAUTHORIZED",
      code: 401,
    });

  try {
    const { sub } = verify(token, Authentication.JWT.SECRET) as {
      sub: string;
    };

    request.user = {
      id: sub,
    };

    next();
  } catch (error) {
    next(error);
  }
}
