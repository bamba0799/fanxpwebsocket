import { Response } from "express";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function getAll(req: CustomRequest, res: Response) {
  try {
    const { groupId } = req.query;
    let team;

    if (groupId) {
      team = await prisma.team
        .findMany({
          where: {
            group: groupId === "0" ? null : { id: groupId as string },
          },
          orderBy: {
            name: "asc",
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });
      return res.json(team);
    }

    team = await prisma.team
      .findMany({
        include: {
          group: true,
          stage: true,
          matchStats: true,
          players: true,
        },
        orderBy: {
          name: "asc",
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
    const {
      name,
      code,
      flag,
      isMemberOfCurrentCAN,
      isDiqualified,
      groupId,
      stageId,
    } = req.body;
    let team;

    if (!name || !code || !flag || isMemberOfCurrentCAN == null) {
      res.status(400);
      throw Error("Missing parameters");
    }

    if (
      isMemberOfCurrentCAN === true &&
      (isDiqualified == null || !stageId || !groupId)
    ) {
      res.status(400);
      throw Error(
        "Must provide additional parameters when `isMemberOfCurrentCAN` is set to `true`"
      );
    }

    if (isMemberOfCurrentCAN === true) {
      team = await prisma.team
        .create({
          data: {
            name,
            code,
            flag,
            isMemberOfCurrentCAN, // true
            isDiqualified,
            group: {
              connect: {
                id: groupId,
              },
            },
            stage: {
              connect: {
                id: stageId,
              },
            },
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });

      return res.status(201).json(team);
    }

    team = await prisma.team
      .create({
        data: {
          name,
          code,
          flag,
          isMemberOfCurrentCAN, // false
          isDiqualified: false,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.status(201).json(team);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function addTeamToAGroup(req: CustomRequest, res: Response) {
  const { teamId, groupId } = req.body;

  try {
    if (!teamId || !groupId) {
      res.status(400);
      throw Error("Missing parameters");
    }

    // get group stage ID
    const groupStageIdArray = await prisma.stage.findMany({
      select: {
        id: true,
      },
      where: {
        label: {
          equals: "group",
        },
      },
    });

    const team = await prisma.team
      .update({
        data: {
          isMemberOfCurrentCAN: true,
          isDiqualified: false,
          group: {
            connect: {
              id: groupId,
            },
          },
          stage: {
            connect: {
              id: groupStageIdArray[0].id,
            },
          },
        },
        where: {
          id: teamId,
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
      message: e.message,
    });
  }
}

export async function remove(req: CustomRequest, res: Response) {
  const { teamId } = req.params;

  try {
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

export async function unassignToAGroup(req: CustomRequest, res: Response) {
  const { teamId } = req.params;

  try {
    const team = await prisma.team
      .update({
        where: {
          id: teamId,
        },
        data: {
          isMemberOfCurrentCAN: false,
          isDiqualified: false,
          group: {
            disconnect: true,
          },
          stage: {
            disconnect: true,
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.status(201).json(team);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}

export async function update(req: CustomRequest, res: Response) {
  const {
    name,
    code,
    flag,
    groupId,
    stageId,
    isMemberOfCurrentCAN,
    isDiqualified,
  } = req.body;
  const { teamId } = req.params;
  let team;

  try {
    if (!name || !code || !flag || isMemberOfCurrentCAN == null) {
      res.status(400);
      throw Error("Missing parameters");
    }

    if (
      isMemberOfCurrentCAN === true &&
      (isDiqualified == null || !stageId || !groupId)
    ) {
      res.status(400);
      throw Error(
        "Must provide additional parameters when `isMemberOfCurrentCAN` is set to `true`"
      );
    }

    if (isMemberOfCurrentCAN === true) {
      team = await prisma.team
        .create({
          data: {
            name,
            code,
            flag,
            isMemberOfCurrentCAN, // true
            isDiqualified,
            group: {
              connect: {
                id: groupId,
              },
            },
            stage: {
              connect: {
                id: stageId,
              },
            },
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });

      return res.status(201).json(team);
    }

    team = await prisma.team
      .update({
        where: {
          id: teamId,
        },
        data: {
          name,
          code,
          flag,
          isMemberOfCurrentCAN, // false
          isDiqualified: false,
          group: {
            disconnect: true,
          },
          stage: {
            disconnect: true,
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.status(201).json(team);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}
