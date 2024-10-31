import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function Show(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    console.log({ id: request.params.id }, "CHAMOU AQUI");
    const factory = TableFactory();

    const query = request.query;
    const limit = Number(request.query.limit ?? 10);
    const page = Number(request.query.page ?? 1);

    delete query.limit;
    delete query.page;

    console.log({
      id: request.params.id,
      limit,
      page,
      ...query,
    });

    const result = await factory.show({
      id: request.params.id,
      limit,
      page,
      ...query,
    });

    console.log(result);

    return response.status(200).json(result);
  } catch (error) {
    console.error(error);
    return response.status(400).json(error);
  }
}
