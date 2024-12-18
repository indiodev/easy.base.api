import { Request, Response } from "express";

import { ColumnFactory } from "@factories/column.factory";

export async function Show(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = ColumnFactory();

  try {
    const result = await factory.show({
      columnId: request.params.id as any,
      tableId: request.params.tableId,
    });

    return response.status(200).json(result);
  } catch (error) {
    console.error(error);
    return response.status(400).json(error);
  }
}
