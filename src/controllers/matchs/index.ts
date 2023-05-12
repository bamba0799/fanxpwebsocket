import { Response } from "express";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function post(req: CustomRequest, res: Response) {
  try {
    const {
      date,
      matchStatus,
      dayId,
      stadiumId,
      stageId,
      homeTeamId,
      awayTeamId,
    } = req.body;

    if (
      !date ||
      !matchStatus ||
      !dayId ||
      !stadiumId ||
      !stageId ||
      !homeTeamId ||
      !awayTeamId
    ) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const match = await prisma.match
      .create({
        data: {
          date,
          matchStatus,
          day: {
            connect: {
              id: dayId,
            },
          },
          stadium: {
            connect: {
              id: stadiumId,
            },
          },
          stage: {
            connect: {
              id: stageId,
            },
          },
          matchStats: {
            createMany: {
              data: [{ teamId: homeTeamId }, { teamId: awayTeamId }],
            },
          },
        },
        include: {
          stadium: true,
          stage: true,
          matchStats: true,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    return res.status(201).json(match);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function getAll(req: CustomRequest, res: Response) {
  try {
    const { date } = req.query;
    let matchs;

    if (date) {
      matchs = await prisma.match
        .findMany({
          where: {
            date: {
              equals: new Date(<string>date),
            },
          },
          select: {
            id: true,
            date: true,
            matchStatus: true,
            stadium: true,
            stage: true,
            day: true,
            matchStats: {
              include: {
                team: true,
              },
            },
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });

      return res.json(matchs);
    }

    matchs = await prisma.match
      .findMany({
        select: {
          id: true,
          date: true,
          matchStatus: true,
          stadium: true,
          stage: true,
          day: true,
          matchStats: {
            include: {
              team: true,
            },
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.json(matchs);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function remove(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params;

    await prisma.match
      .delete({
        where: {
          id,
        },
      })
      .catch((e) => {
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