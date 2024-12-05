import { z } from "zod";

export const UserUpdateValidator = z.object({
  id: z.string().uuid().trim().optional(),
  email: z.string().email().trim(),
  password: z.string().trim(),
  name: z.string().trim(),
  group: z.string().uuid().trim(),
});

export const UserTableUpdateValidator = z.object({
  tableId: z.string().trim().optional(),
  id: z.string().trim().optional(),
  layout: z.enum(["grid", "list"]).optional(),
  column_order: z
    .object({
      root: z.array(z.string()).optional(),
      form: z.array(z.string()).optional(),
    })
    .optional(),
});

export const UserCreateValidator = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
  name: z.string().trim(),
  // group: z.string().uuid().trim(),
});
