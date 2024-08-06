import type { z } from "zod";

import type {
  AuthLoginValidator,
  AuthRegisterValidator,
} from "@validators/auth.validator";

export type AuthLogin = z.infer<typeof AuthLoginValidator>;
export type AuthRegister = z.infer<typeof AuthRegisterValidator>;
