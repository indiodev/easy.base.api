import { Request, Response } from "express";

import { Env } from "@config/env";
import { RowFactory } from "@factories/row.factory";

export async function Create(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();

  const file_payload = (
    request.files as { fieldname: string; originalname: string }[]
  )?.reduce(
    (acc, file) => {
      const field = file.fieldname?.replace("[]", "");
      if (!acc[field]) acc[field] = [];
      const isDevelopment = Env.NODE_ENV === "development";

      if (file.originalname && isDevelopment) {
        let filename = "http://localhost:"
          .concat(String(Env.PORT))
          .concat("/files/")
          .concat(file.originalname);
        acc[field].push(filename);
      }

      return acc;
    },
    {} as Record<string, any>,
  );

  const result = await factory.create({
    tableId: request.params.id,
    ...request.body,
    ...file_payload,
  });

  return response.status(200).json(result);
}
