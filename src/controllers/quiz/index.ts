import { prisma } from "./../../lib/prisma";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        responses: true,
      },
    });

    res.json(quizzes);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        responses: true,
      },
    });

    res.json(quizzes);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function saveResponse(req: Request, res: Response) {
  const { resId, usId } = req.body;
  try {
    const userResponse = await prisma.userResponse.create({
      data: {
        userId: usId,
        responseId: resId,
      },
    });
    res.json(userResponse);
  } catch (error) {
    console.log("l'erreur est :", error);
  }
}
