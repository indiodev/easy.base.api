import { FormController } from "@controllers/form";

import { router } from "./router";

router.post("/form", FormController.Create);
router.get("/form", FormController.List);
router.get("/form/:id", FormController.Show);
router.put("/form", FormController.Update);
router.delete("/form/:id", FormController.Delete);

export { router as formRoutes };
