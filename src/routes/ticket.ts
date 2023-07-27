import express from "express"
import {getAll} from "../controllers/tickets"

const {PrismaClient} = require('@prisma/client')

const router = express.Router();

const prisma = new PrismaClient

router.get('/:id', getAll)


export default router

