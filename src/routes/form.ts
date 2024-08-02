import type { Form } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import express from "express";

export const formRoutes = express.Router();

const prisma = new PrismaClient();

formRoutes.post("/form", async (req: Request, res: Response) => {
  const form = await prisma.form.create({
    data: {
      ...req.body,
      id: req.body.id,
      tableId: req.body.tableId,
      userId: req.body.userId,
    } as Form,
  });

  res.json(form);
});

formRoutes.get("/form", async (req: Request, res: Response) => {
  const forms = await prisma.form.findMany({
    include: {
      table: true,
      created_by: true,
    },
  });

  res.json(forms);
});

formRoutes.get("/form/:id", async (req: Request, res: Response) => {
  const form = await prisma.form.findFirst({
    where: {
      id: req.params.id,
    },
    include: {
      table: true,
      created_by: true,
    },
  });

  res.json(form);
});

formRoutes.put("/form", async (req: Request, res: Response) => {
  const id = req.body.id;

  var data = req.body;
  delete data.id;

  const form = await prisma.form.update({
    where: {
      id: id,
    },
    data,
  });

  res.json(form);
});

formRoutes.delete("/form", async (req: Request, res: Response) => {
  const id = req.body.id;

  const form = await prisma.form.delete({
    where: {
      id: id,
    },
  });

  res.json(form);
});
