import { UserController } from "@controllers/user";
import { Middleware } from "@middleware/index";

import { router } from "./router";

router.get("/users", Middleware.Authentication, UserController.List);
router.post("/users", UserController.Create);
router.get("/users/profile", Middleware.Authentication, UserController.Profile);
router.get("/users/:id", UserController.Show);
router.delete("/users/:id", UserController.Delete);
router.put("/users/:id", UserController.Update);
router.patch("/users/table", Middleware.Authentication, UserController.Table);

export { router as userRoutes };
