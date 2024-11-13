import { z } from "zod";

export const AuthLoginValidator = z.object({
  email: z
    .string({
      required_error: "E-mail obrigatório",
    })
    .email({
      message: "Informe um e-mail válido",
    })
    .trim(),
  password: z
    .string({
      required_error: "Senha obrigatória",
    })
    .trim(),
});

export const AuthRegisterValidator = z.object({
  email: z
    .string({
      required_error: "E-mail obrigatório",
    })
    .email({
      message: "Informe um e-mail válido",
    })
    .trim(),
  password: z
    .string({
      required_error: "Senha obrigatória",
    })
    .trim(),
  name: z
    .string({
      required_error: "Nome obrigatório",
    })
    .trim(),
});
