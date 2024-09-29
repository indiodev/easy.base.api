import { Request, Response } from "express";
import { RowFactory } from "@factories/row.factory";

export async function Update(
  request: Request,
  response: Response,
): Promise<Response> {
  // const factory = RowFactory();
  // const id = request.body.id;
  // const tableId = request.params.id;
  // const payload = request.body.data;
  // delete payload.id;

  console.log(request.body)

  // const result = await factory.update({
  //   id,
  //   tableId,
  //   ...payload,
  // });
  const result = null;
  return response.status(200).json(result);
}
