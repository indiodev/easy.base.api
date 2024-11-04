import { AuthenticationMiddleware } from "./authentication.middleware";
import { ErrorHandlerMiddleware } from "./error-handler.middleware";

export const Middleware = {
  Authentication: AuthenticationMiddleware,
  ErrorHandler: ErrorHandlerMiddleware,
};
