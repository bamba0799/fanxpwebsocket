import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function post(req: Request, res: Response) {
  const { name, location, city, capacity, description, image } = req.body;

  try {
    // Check for request payloads
    if (!name || !location || !city || !capacity || description || !image) {
      res.status(400);
      throw new Error("Missing parameters");
    }

    const stadium = await prisma.stadium
      .create({
        data: {
          name,
          location,
          city,
          capacity,
          description,
          images: {
            create: {
              url: image,
            },
          },
        },
        include: {
          images: true,
        },
      })
      .catch((e: any) => {
        res.status(422);
        throw e;
      });

    res.json(stadium);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const stadiums = await prisma.stadium
      .findMany({
        include: {
          images: true,
        },
        orderBy: {
          name: "asc",
        },
      })
      .catch((e: any) => {
        res.status(422);
        throw e;
      });

    res.json(stadiums);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}

export async function getOne(req: Request, res: Response) {
  const { stadiumId } = req.params;

  try {
    const stadium = await prisma.stadium
      .findUnique({
        where: {
          id: stadiumId,
        },
        include: {
          images: true,
        },
      })
      .catch((e: any) => {
        res.status(422);
        throw e;
      });

    res.json(stadium);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}

export async function update(req: Request, res: Response) {
  const { stadiumId, name, location, city, capacity, description, image } =
    req.body;

  try {
    // Check for request payloads
    if (
      !stadiumId ||
      !name ||
      !location ||
      !city ||
      !capacity ||
      description ||
      !image
    ) {
      res.status(400);
      throw new Error("Missing parameters");
    }

    const stadium = await prisma.stadium
      .update({
        where: {
          id: stadiumId,
        },
        data: {
          name,
          location,
          city,
          capacity,
          description,
          images: {
            create: {
              url: image,
            },
          },
        },
        include: {
          images: true,
        },
      })
      .catch((e: any) => {
        res.status(422);
        throw e;
      });

    res.json(stadium);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}

export async function remove(req: Request, res: Response) {
  const { stadiumId } = req.params;

  try {
    await prisma.stadium
      .delete({
        where: {
          id: stadiumId,
        },
      })
      .catch((e: any) => {
        res.status(422);
        throw e;
      });

    res.sendStatus(204);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}
