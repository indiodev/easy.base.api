import { AuthenticationMiddleware } from "./authentication.middleware";
import { ErrorHandlerMiddleware } from "./error-handler.middleware";
import { TableCreateRoleMiddleware } from "./table/create-role.middleware";
import { TableUpdateRoleMiddleware } from "./table/update-role.middleware";

export const Middleware = {
  Authentication: AuthenticationMiddleware,
  ErrorHandler: ErrorHandlerMiddleware,
  TableCreateRoleMiddleware: TableCreateRoleMiddleware,
  TableUpdateRoleMiddleware: TableUpdateRoleMiddleware,
} as const;
