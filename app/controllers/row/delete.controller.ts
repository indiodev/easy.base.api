import { Request, Response } from "express";

import { RowFactory } from "@factories/row.factory";

export async function Delete(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();

  const result = await factory.delete({
    tableId: request.params.tableId,
    id: request.params.id
  });
  
  return response.status(200).json(result);
}
