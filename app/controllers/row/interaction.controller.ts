import { Request, Response } from "express";

import { InteractionFactory } from "@factories/interaction.factory";

export async function Interaction(
  request: Request,
  response: Response,
): Promise<Response> {
  const factory = InteractionFactory();
  const id = request.params.id; // row id
  const tableId = request.params.tableId; // table id

  const userId = "" // Marcos, verificar o usuario logado pelo jwt

  const data = request.body;

  const result = await factory.update({
    tableId, 
    columnId: data.columnId, 
    rowId: data.rowId, 
    value: data.value, 
    userId
  });

  return response.status(200).json(result);
}
