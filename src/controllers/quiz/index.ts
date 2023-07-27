import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";



export async function getAll(req:Request, res:Response) {
  try {
   const quizzes = await prisma.quiz
      .findMany({
        include: {
          responses:true
        }
      })

    res.json(quizzes)

  }catch(e:any){
    res.json({
      name: e.name ?? "Error",
      message:e.message as string
    })
  }
}


export async function getOne(req:Request, res:Response) {
  try {
   const quizzes = await prisma.quiz
      .findMany({
        include: {
          responses:true
        }
      })

    res.json(quizzes)

  }catch(e:any){
    res.json({
      name: e.name ?? "Error",
      message:e.message as string
    })
  }
}


