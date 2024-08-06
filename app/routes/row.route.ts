import { RowController } from "@controllers/row";

import { router } from "./router";

router.post("/tables/:id/row", RowController.Create);
router.put("/tables/:id/row", RowController.Update);
router.delete("/tables/:id/row", RowController.Delete);

export { router as rowRoutes };
