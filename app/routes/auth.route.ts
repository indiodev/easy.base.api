import { AuthController } from "@controllers/auth";

import { router } from "./router";

router.post("/login", AuthController.Login);
router.post("/register", AuthController.Register);

export { router as authRoutes };
