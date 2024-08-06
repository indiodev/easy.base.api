import { z } from "zod";

export const UserUpdateValidator = z.object({
  id: z.string().uuid().trim().optional(),
  email: z.string().email().trim(),
  password: z.string().trim(),
  name: z.string().trim(),
  group: z.string().uuid().trim(),
});

export const UserCreateValidator = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
  name: z.string().trim(),
  // group: z.string().uuid().trim(),
});
