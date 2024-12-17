import { TableController } from "@controllers/table";
import { Middleware } from "@middleware/index";

import { router } from "./router";

router.get("/tables/:id", Middleware.Authentication, TableController.Show);
router.get(
  "/tables/:id/filter",
  Middleware.Authentication,
  TableController.Filter,
);
router.get("/tables", Middleware.Authentication, TableController.List);
router.post(
  "/tables",
  Middleware.Authentication,
  Middleware.TableCreateRoleMiddleware,
  TableController.Create,
);
router.delete("/tables/:id", Middleware.Authentication, TableController.Delete);
router.put(
  "/tables/:id",
  Middleware.Authentication,
  Middleware.TableUpdateRoleMiddleware,
  TableController.Update,
);
router.get("/tableseed/:id", Middleware.Authentication, TableController.Seed);

export { router as tableRoutes };
