import { PrismaClient, UserRole } from "@prisma/client";
import express, { Request, Response } from "express"

export const rolesRoutes = express.Router()

const prisma = new PrismaClient()


rolesRoutes.get('/roles', async (req: Request, res: Response) => {

    return res.json(UserRole)

})

