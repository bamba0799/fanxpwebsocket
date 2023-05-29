import { Response } from "express";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function getAll(req: CustomRequest, res: Response) {
  const { idCountry } = req.query;
  try {
    const player = await prisma.player
      .findMany({
        where: {
          countryId: idCountry as string,
        },
      })
      .catch((e: any) => {
        res.status(400);
        throw e;
      });
    res.json(player);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function getOne(req: CustomRequest, res: Response) {
  try {
    const { PlayerId } = req.params;
    const player = await prisma.player
      .findUnique({
        where: {
          id: PlayerId,
        },
      })
      .catch((e: any) => {
        res.status(400);
        throw e;
      });
    res.json(player);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function post(req: CustomRequest, res: Response) {
  try {
    const {
      name,
      shirtNumber,
      position,
      birthday,
      careerGoal,
      club,
      countryId,
    } = req.body;

    if (
      !name ||
      !shirtNumber ||
      !position ||
      !birthday ||
      !careerGoal ||
      !club ||
      countryId
    ) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const players = await prisma.player
      .create({
        data: {
          name,
          shirtNumber,
          position,
          birthday,
          careerGoal,
          club,
          countryId,
        },
      })
      .catch((e: any) => {
        res.status(400);
        throw e;
      });

    return res.status(201).json(players);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function deletePlayer(req: CustomRequest, res: Response) {
  try {
    const { PlayerId } = req.params;

    await prisma.player
      .delete({
        where: {
          id: PlayerId,
        },
      })
      .catch((e: any) => {
        res.status(400);
        throw e;
      });
    res.json("player delete succesfull");
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function updatePlayer(req: CustomRequest, res: Response) {
  const { PlayerId } = req.params;
  try {
    const {
      name,
      shirtNumber,
      position,
      birthday,
      careerGoal,
      club,
      countryId,
    } = req.body;

    if (
      !name ||
      !shirtNumber ||
      !position ||
      !birthday ||
      !careerGoal ||
      !club ||
      countryId
    ) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const player = await prisma.player.update({
      where: {
        id: PlayerId,
      },
      data: {
        name,
        shirtNumber,
        position,
        birthday,
        careerGoal,
        club,
        countryId,
      },
    });

    res.status(201).json(player);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}
