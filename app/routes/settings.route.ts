import type { Request, Response } from "express";

import { router } from "./router";

router.get("/settings", (req: Request, res: Response) => {
  res.json({ message: "Settings" });
});

export { router as settingsRoutes };
