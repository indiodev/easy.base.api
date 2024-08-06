import { z } from "zod";

import {
  UserCreateValidator,
  UserUpdateValidator,
} from "@validators/user.validator";

export type UserUpdate = z.infer<typeof UserUpdateValidator>;
export type UserCreate = z.infer<typeof UserCreateValidator>;
