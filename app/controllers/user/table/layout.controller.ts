import { Response } from "express";

import { UserFactory } from "@factories/user.factory";
import { CustomRequest } from "@middleware/authentication.middleware";
import { UserTableUpdateValidator } from "@validators/user.validator";

export async function TableLayout(
  request: CustomRequest,
  response: Response,
): Promise<Response> {
  const factory = UserFactory();
  const payload = UserTableUpdateValidator.parse({
    ...request.body,
    id: request?.user?.id,
  });

  const result = await factory.tableLayoutView(payload);
  return response.status(200).json(result);
}
