import { Response } from "express";
import { prisma } from "../../lib/prisma";
import { CustomRequest } from "./types";

export async function getAll(req: CustomRequest, res: Response) {
  try {
    const groupTeam = await prisma.group
      .findMany({
        include: {
          teams: {
            where: {
              stage: {
                label: "group",
              },
            },
            include: {
              matchStats: {
                where: {
                  match: {
                    stage: {
                      label: "group",
                    },
                  },
                },
                include: {
                  match: {
                    include: {
                      day: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          label: "asc",
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });
    res.json(groupTeam);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function getOne(req: CustomRequest, res: Response) {
  const { groupId } = req.params;

  try {
    const oneGroupTeam = await prisma.group
      .findUnique({
        where: {
          id: groupId,
        },
        include: {
          teams: {
            include: {
              matchStats: true,
            },
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });
    res.json(oneGroupTeam);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function post(req: CustomRequest, res: Response) {
  const { label } = req.body;

  if (!label) {
    res.status(400);
    throw Error("Missing parameters");
  }

  try {
    const group = await prisma.group
      .create({
        data: {
          label,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.json(group);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}
