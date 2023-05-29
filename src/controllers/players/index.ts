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
  const { playerId } = req.params;

  try {
    const player = await prisma.player
      .findUnique({
        where: {
          id: playerId,
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
  const {
    name,
    shirtNumber,
    position,
    birthday,
    careerGoal,
    club,
    image,
    countryId,
  } = req.body;

  try {
    if (
      !name ||
      !shirtNumber ||
      !position ||
      !birthday ||
      !careerGoal ||
      !club ||
      !image ||
      !countryId
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
          image,
          country: {
            connect: {
              id: countryId,
            },
          },
        },
      })
      .catch((e: any) => {
        res.status(400);
        throw e;
      });

    res.status(201).json(players);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function remove(req: CustomRequest, res: Response) {
  const { playerId } = req.params;

  try {
    await prisma.player
      .delete({
        where: {
          id: playerId,
        },
      })
      .catch((e: any) => {
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

export async function update(req: CustomRequest, res: Response) {
  const {
    name,
    shirtNumber,
    position,
    birthday,
    careerGoal,
    club,
    image,
    countryId,
  } = req.body;
  const { playerId } = req.params;

  try {
    if (
      !name ||
      !shirtNumber ||
      !position ||
      !birthday ||
      !careerGoal ||
      !club ||
      !image ||
      countryId
    ) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const player = await prisma.player.update({
      where: {
        id: playerId,
      },
      data: {
        name,
        shirtNumber,
        position,
        birthday,
        careerGoal,
        club,
        image,
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
