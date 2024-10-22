import { z } from "zod";

import {
  UserCreateValidator,
  UserTableUpdateValidator,
  UserUpdateValidator,
} from "@validators/user.validator";

export type UserUpdate = z.infer<typeof UserUpdateValidator>;
export type UserCreate = z.infer<typeof UserCreateValidator>;
export type UserTableUpdate = z.infer<typeof UserTableUpdateValidator>;
