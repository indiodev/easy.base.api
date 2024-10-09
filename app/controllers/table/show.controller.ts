import { Request, Response } from "express";

import { TableFactory } from "@factories/table.factory";

export async function Show(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    const factory = TableFactory();
    const result = await factory.show(request.params.id);
    return response.status(200).json(result);
  }catch(error){
    console.log(error);
    return response.status(400).json(error);
  }
}
