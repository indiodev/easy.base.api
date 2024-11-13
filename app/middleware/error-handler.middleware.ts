import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { ApplicationException } from "@exceptions/application.exception";

export function ErrorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (error instanceof ZodError) {
    console.error(JSON.stringify(error, null, 2));
    const errors = error.errors.map((issue) => ({
      message: issue.message,
    }));
    return response.status(400).json({ errors });
  }

  if (error instanceof ApplicationException) {
    return response.status(error.exception.code).json({
      ...error.exception,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
}
