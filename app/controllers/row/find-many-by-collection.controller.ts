import { Request, Response } from "express";

import { RowFactory } from "@factories/row.factory";

export async function findManyByCollection(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();
  const result = await factory.findManyByCollection({
    columnId: request.params.columnId,
    data_collection: request.params.data_collection,
  });
  return response.status(200).json(result);
}
