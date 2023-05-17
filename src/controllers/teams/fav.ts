import { Response } from "express";
import { Team } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function getAll(req: CustomRequest, res: Response) {
  const { userId } = req.params;

  try {
    const teams = await prisma.team
      .findMany({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.json(teams);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function remove(req: CustomRequest, res: Response) {
  try {
    const { userId, teamId } = req.body;

    await prisma.$executeRaw`DELETE FROM _TeamToUser
    WHERE A =${teamId} AND B =${userId}`.catch((e) => {
      res.status(400);
      throw e;
    });

    res.sendStatus(204);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function post(req: CustomRequest, res: Response) {
  try {
    const { teamId, userId } = req.body;

    if (!teamId || !userId) {
      res.status(400);
      throw Error("Missing parameters");
    }

    await prisma.$executeRaw`INSERT INTO _TeamToUser (A, B) 
      VALUES (${teamId}, ${userId})`.catch((e) => {
      res.status(400);
      throw e;
    });

    res.sendStatus(201);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}
