import { ColumnController } from "@controllers/column";
import { Middleware } from "@middleware/index";

import { router } from "./router";

router.post(
  "/columns",
  Middleware.Authentication,
  Middleware.TableCreateRoleMiddleware,
  ColumnController.Create,
);
router.patch(
  "/columns/:id",
  Middleware.Authentication,
  Middleware.TableUpdateRoleMiddleware,
  ColumnController.Update,
);

router.get(
  "/tables/:tableId/columns",
  Middleware.Authentication,
  ColumnController.FindManyByTableId,
);

router.get(
  "/tables/:tableId/columns/:id",
  Middleware.Authentication,
  ColumnController.Show,
);

export { router as columnRoutes };
