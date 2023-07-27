import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getAll(req: Request, res:Response){
  console.log()

 const tickets = await prisma.ticket.findMany({
  where: {matricule:"123"}
 })
 return res.json(tickets)
 
}
