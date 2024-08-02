import type { Column } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import express from "express";

import { slugify } from "../utils/utils";

export const tableRoutes = express.Router();

const prisma = new PrismaClient();

tableRoutes.get("/tables/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const tables = await prisma.table.findUnique({
    where: { id },
    include: {
      columns: true,
      rows: true,
    },
  });
  res.json(tables);
});

tableRoutes.get("/tables", async (req: Request, res: Response) => {
  const tables = await prisma.table.findMany({
    include: {
      columns: true,
      rows: true,
    },
  });
  res.json(tables);
});

tableRoutes.post("/tables", async (req: Request, res: Response) => {
  const table = await prisma.table.create({
    data: {
      identifier: req.body.data.title,
      title: req.body.data.title,
      columns: {
        create: req.body.data.columns.map(
          (col: any) =>
            ({
              title: col.title,
              type: col.type,
              slug: slugify(col.title),
              config: col.config || null,
            }) as Column,
        ),
      },
    } as any,
  });

  res.json(table);
});

tableRoutes.delete("/tables/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const rows = await prisma.row.deleteMany({
    where: {
      tableId: id,
    },
  });

  const cols = await prisma.column.deleteMany({
    where: {
      tableId: id,
    },
  });

  const table = await prisma.table.delete({
    where: {
      id,
    },
  });
  res.json(table);
});

tableRoutes.put("/tables/:id", async (req: Request, res: Response) => {
  const targetId = req.params.id;

  const tables = await prisma.table.update({
    where: {
      id: targetId,
    },
    data: {
      identifier: req.body.data.title,
      title: req.body.data.title,
      columns: {
        update: req.body.data.columns.map(
          (col: any) =>
            ({
              title: col.title,
              type: col.type,
              slug: slugify(col.title),
              config: col.config || null,
            }) as Column,
        ),
      },
    },
  });

  res.json(tables);
});
