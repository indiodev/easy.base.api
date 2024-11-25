import { Request, Response } from "express";

import { RowFactory } from "@factories/row.factory";

export async function Paginate(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = RowFactory();
  const query = request.query;

  const page = Number(request.query.page ?? 1);
  const per_page = Number(request.query.per_page ?? 10);

  delete query.per_page;
  delete query.page;

  const result = await factory.paginate({
    id: request.params.tableId,
    per_page,
    page,
    ...query,
  });
  return response.status(200).json(result);
}
