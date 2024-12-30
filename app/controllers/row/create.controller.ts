import { Request, Response } from "express";

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

      if (file.filename) {
        let filename = "/files/".concat(file.filename);
        acc[field].push({ filename, type: file.mimetype });
      }

      return acc;
    },
    {} as Record<string, any>,
  );

  console.log("Create Row: ", {
    tableId: request.params.id,
    ...request.body,
    ...file_payload,
  });

  const result = await factory.create({
    tableId: request.params.id,
    ...request.body,
    ...file_payload,
  });

  return response.status(200).json(result);
}
