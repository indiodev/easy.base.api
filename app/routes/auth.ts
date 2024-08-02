import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import express from "express";

export const authRoutes = express.Router();

const prisma = new PrismaClient();

authRoutes.post("/login", async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (user) res.json(user);
  else res.json({ erro: "Credenciais inválidas." });
});

authRoutes.post("/register", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    },
  });
  if (user) res.json(user);
  else res.json({ erro: "Credenciais inválidas." });
});
