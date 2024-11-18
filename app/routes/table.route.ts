import { TableController } from "@controllers/table";

import { router } from "./router";

router.get("/tables/:id", TableController.Show);
router.get("/tables/:id/filter", TableController.Filter);
router.get("/tables", TableController.List);
router.post("/tables", TableController.Create);
router.delete("/tables/:id", TableController.Delete);
router.put("/tables/:id", TableController.Update);
router.get("/tableseed/:id", TableController.Seed);

export { router as tableRoutes };
