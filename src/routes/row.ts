import { PrismaClient, Row } from "@prisma/client";
import express, { Request, Response } from "express"

export const rowRoutes = express.Router()

const prisma = new PrismaClient()

rowRoutes.post('/tables/:id/row', async (req: Request, res: Response) => {

    const row = await prisma.row.create({
        data: {
            value: {
                ...req.body.data,
            },
            tableId: req.params.id
        } as Row,

    })

    res.json(row);
})

rowRoutes.put('/tables/:id/row', async (req: Request, res: Response) => {

    const tableId = req.params.id;
    const id = req.body.id;

    var data = req.body
    delete data.id

    const row = await prisma.row.update({
        where: {
            id: id
        },
        data: {
            value: data
        }
    })

    res.json(row);
})

rowRoutes.delete('/tables/:id/row', async (req: Request, res: Response) => {

    const tableId = req.params.id;
    const id = req.body.id


    const row = await prisma.row.delete({
        where: {
            id: id
        },
    })

    res.json(row);
})