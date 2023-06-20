import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getUser(req: Request, res: Response) {
  try {
    const user = await prisma.user
      .findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          id: true,
          contact: true,
          firstName: true,
          lastName: true,
          nationality: true,
          address: true,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.json(user);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}

export async function getPicture(req: Request, res: Response) {
  try {
    const userProfilePic = await prisma.user
      .findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          profilePicture: true,
        },
      })
      .catch((e) => {
        res.status(422);
        throw e;
      });

    res.json(userProfilePic);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}
