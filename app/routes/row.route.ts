import multer from "multer";

import { RowController } from "@controllers/row";
import { Middleware } from "@middleware/index";
import { storage } from "@util/multer";

import { router } from "./router";

const upload = multer({ storage });
router.get(
  "/tables/:tableId/row/paginate",
  Middleware.Authentication,
  RowController.Paginate,
);

router.get(
  "/tables/:tableId/row/:id",
  Middleware.Authentication,
  RowController.Show,
);

router.get(
  "/tables/:data_collection/column/:columnId/row",
  Middleware.Authentication,
  RowController.findManyByCollection,
);

router.post(
  "/tables/:id/row",
  upload.any(),
  Middleware.Authentication,
  Middleware.TableCreateRoleMiddleware,
  RowController.Create,
);

router.patch(
  "/tables/:tableId/row/:id",
  upload.any(),
  Middleware.Authentication,
  Middleware.TableUpdateRoleMiddleware,
  RowController.Update,
);

router.delete(
  "/tables/:tableId/row/:id",
  Middleware.Authentication,
  RowController.Delete,
);

router.post(
  "/tables/interact/:tableId/row/:id",
  Middleware.Authentication,
  RowController.Interaction,
);

export { router as rowRoutes };
