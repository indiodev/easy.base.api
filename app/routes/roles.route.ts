import { RoleController } from "@controllers/role";

import { router } from "./router";

router.get("/roles", RoleController.List);

export { router as rolesRoutes };
