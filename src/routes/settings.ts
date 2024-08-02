import type { Request, Response } from "express";
import express from "express";

export const settingsRoutes = express.Router();

settingsRoutes.get("/settings", (req: Request, res: Response) => {
  res.json({ message: "Settings" });
});
