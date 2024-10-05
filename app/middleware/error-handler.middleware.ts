import { NextFunction, Request, Response } from "express";

import { ApplicationException } from "@exceptions/application.exception";

export function ErrorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (error instanceof ApplicationException) {
    return response.status(error.exception.code).json({
      ...error.exception,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
}
