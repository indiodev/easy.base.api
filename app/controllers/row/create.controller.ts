import { Request, Response } from "express";

import { Env } from "@config/env";
import { RowFactory } from "@factories/row.factory";

export async function Create(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();

  const file_payload = (
    request.files as { fieldname: string; filename: string; mimetype: string }[]
  )?.reduce(
    (acc, file) => {
      const field = file.fieldname?.replace("[]", "");
      if (!acc[field]) acc[field] = [];
      const isDevelopment = Env.NODE_ENV === "development";

      if (file.filename && isDevelopment) {
        let filename = "http://localhost:"
          .concat(String(Env.PORT))
          .concat("/files/")
          .concat(file.filename);
        acc[field].push({ filename, type: file.mimetype });
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
