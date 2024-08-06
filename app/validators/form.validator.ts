import { z } from "zod";

export const FormCreateValidator = z.object({
  id: z.string().uuid().trim().optional(),
  tableId: z.string().uuid().trim(),
  userId: z.string().uuid().trim(),
});

export const FormUpdateValidator = z.object({
  id: z.string().uuid().trim().optional(),
  tableId: z.string().uuid().trim(),
  userId: z.string().uuid().trim(),
});
