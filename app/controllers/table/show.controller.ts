import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function Show(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const factory = TableFactory();

    const query = request.query;

    const page = Number(request.query.page ?? 1);
    const per_page = Number(request.query.per_page ?? 10);

    delete query.per_page;
    delete query.page;

    const { meta, table } = await factory.show({
      id: request.params.id,
      per_page,
      page,
      ...query,
    });

    return response.status(200).json({ data: table, meta });
  } catch (error) {
    console.error(error);
    return response.status(400).json(error);
  }
}
