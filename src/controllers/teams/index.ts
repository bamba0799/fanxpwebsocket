import { Response } from "express";
import { Team } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function getAll(req: CustomRequest, res: Response) {
  try {
    const team = await prisma.team
      .findMany({
        include: {
          group: true,
          stage: true,
          matchStats: true,
          players: true,
          // users: true,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });
    res.json(team);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}
export async function getOne(req: CustomRequest, res: Response) {
  try {
    const { teamId } = req.params;
    const team = await prisma.team
      .findUnique({
        where: {
          id: teamId,
        },
        include: {
          group: true,
          stage: true,
          matchStats: true,
          players: true,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });
    res.json(team);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function post(req: CustomRequest, res: Response) {
  try {
    const areParamsDefined = Object.values(req.body).some((value) => {
      return value ? true : false;
    });

    if (!areParamsDefined) {
      res.status(400);
      throw Error("Missing parameters");
    }
    const {
      name,
      code,
      flag,
      isMemberOfCurrentCAN,
      isDiqualified,
      groupId,
      stageId,
    } = req.body;

    const teams = await prisma.team
      .create({
        data: {
          name,
          code,
          flag,
          isMemberOfCurrentCAN,
          isDiqualified,
          groupId,
          stageId,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    return res.status(201).json(teams);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function deleteTeam(req: CustomRequest, res: Response) {
  try {
    const { teamId } = req.params;

    await prisma.team
      .delete({
        where: {
          id: teamId,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });
    res.json("delete succesfull");
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function updateTeam(req: CustomRequest, res: Response) {
  const { teamId } = req.params;
  try {
    const areParamsDefined = Object.values(req.body).some((value) => {
      return value ? true : false;
    });

    if (!areParamsDefined) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const team = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        name: req.body.name,
        code: req.body.code,
        flag: req.body.flag,
        groupId: req.body.groupId,
        stageId: req.body.stageId,
        isMemberOfCurrentCAN: req.body.isMemberOfCurrentCAN,
        isDiqualified: req.body.isDiqualified,
      },
    });

    res.status(201).json(team);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}
