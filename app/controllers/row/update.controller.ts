import { Request, Response } from "express";

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

  const result = await factory.update({
    id,
    tableId,
    ...data,
  });

  return response.status(200).json(result);
}
