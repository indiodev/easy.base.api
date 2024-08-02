import type { Request, Response } from "express";
import express from "express";

export const defaultRoutes = express.Router();

defaultRoutes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Gerenciador - Banco de Dados" });
});
