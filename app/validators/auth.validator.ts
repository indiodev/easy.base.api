import { z } from "zod";

export const AuthLoginValidator = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
});

export const AuthRegisterValidator = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
  name: z.string().trim(),
});
