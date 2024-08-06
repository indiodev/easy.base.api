import { UserController } from "@controllers/user";

import { router } from "./router";

router.get("/users", UserController.List);
router.post("/users", UserController.Create);
router.get("/users/:id", UserController.Show);
router.delete("/users/:id", UserController.Delete);
router.put("/users/:id", UserController.Update);

export { router as userRoutes };
