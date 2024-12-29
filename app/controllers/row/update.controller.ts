import { Request, Response } from "express";

import { Env } from "@config/env";
import { RowFactory } from "@factories/row.factory";

export async function Update(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();
  const id = request.params.id; // row id
  const tableId = request.params.tableId; // table id

  const data = request.body;

  delete data._id;

  const file_payload = (
    request.files as { fieldname: string; filename: string; mimetype: string }[]
  )?.reduce(
    (acc, file) => {
      const field = file.fieldname?.replace("[]", "");
      if (!acc[field]) acc[field] = [];
      const isDevelopment = Env.NODE_ENV === "development";
      const isProduction = Env.NODE_ENV === "production";

      if (file.filename && isDevelopment) {
        let filename = "http://localhost:"
          .concat(String(Env.PORT))
          .concat("/files/")
          .concat(file.filename);
        acc[field].push({ filename, type: file.mimetype });
      } else {
        let filename = "https://easybaseapi-production.up.railway.app"
          .concat("/files/")
          .concat(file.filename);
        acc[field].push({ filename, type: file.mimetype });
      }

      // if (file.filename && isProduction) {
      //   let filename = "https://easybaseapi-production.up.railway.app"
      //     .concat("/files/")
      //     .concat(file.filename);
      //   acc[field].push({ filename, type: file.mimetype });
      // }

      return acc;
    },
    {} as Record<string, any>,
  );

  const result = await factory.update({
    id,
    tableId,
    ...data,
    ...file_payload,
  });

  return response.status(200).json(result);
}
