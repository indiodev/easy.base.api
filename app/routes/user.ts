import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import express from "express";

import { UserController } from "@controllers/user";

import { exclude } from "../util/validators";

export const userRoutes = express.Router();

const prisma = new PrismaClient();
userRoutes.get("/users/:id", UserController.Show);
// userRoutes.get("/users/:id", async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const user = await prisma.user.findUnique({
//     where: { id },
//     include: {
//       role: true,
//       group: true,
//       reviews: true,
//     },
//   });

//   const userWithoutPassword = exclude(user, ["password"]);

//   if (user) res.json(userWithoutPassword);
//   else res.sendStatus(202);
// });

userRoutes.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      role: true,
      group: true,
      reviews: true,
    },
  });

  const usersWithoutPassword = users.map((user) => exclude(user, ["password"]));

  res.json(usersWithoutPassword);
});

userRoutes.post("/users", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.json(user);
});

userRoutes.delete("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  res.json(user);
});

userRoutes.put("/users/:id", async (req: Request, res: Response) => {
  const targetId = req.params.id;

  const user = await prisma.user.update({
    where: {
      id: targetId,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      group: req.body.group,
    },
  });

  res.json(user);
});
