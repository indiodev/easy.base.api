import type { Request, Response } from "express";

import { router } from "./router";

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Gerenciador - Banco de Dados" });
});

export { router as defaultRoutes };
