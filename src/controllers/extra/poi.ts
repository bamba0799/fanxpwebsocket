import { Response } from "express";
import { InterestPointCategory, InterestPointStatus } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function postCategory(
  req: CustomRequest<InterestPointCategory>,
  res: Response
) {
  try {
    const { label } = req.body;

    if (!label) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const category = await prisma.interestPointCategory
      .create({
        data: {
          label,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.status(201).json(category);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function getAllCategories(req: CustomRequest, res: Response) {
  try {
    const poiCategory = await prisma.interestPointCategory
      .findMany()
      .catch((e) => {
        res.status(400);
        throw e;
      });
    res.json(poiCategory);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function updateCategory(
  req: CustomRequest<InterestPointCategory>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { label } = req.body;

    const category = await prisma.interestPointCategory
      .update({
        where: {
          id,
        },
        data: {
          label,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.json(category);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function deleteCategory(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params;

    await prisma.interestPointCategory
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

export async function postPOI(req: CustomRequest, res: Response) {
  try {
    const {
      name,
      location,
      contact,
      shortDescription,
      longDescription,
      status,
      categoryId,
      img,
    } = req.body;

    if (
      !name ||
      !location ||
      !contact ||
      !status ||
      !shortDescription ||
      !longDescription ||
      !categoryId
    ) {
      res.status(400);
      throw Error("Missing parameters");
    }

    let poi;

    if (img) {
      poi = await prisma.interestPoint
        .create({
          data: {
            name,
            location,
            contact,
            shortDescription,
            longDescription,
            status,
            category: {
              connect: {
                id: categoryId,
              },
            },
            images: {
              create: {
                url: img,
              },
            },
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });

      return res.status(201).json(poi);
    }

    poi = await prisma.interestPoint
      .create({
        data: {
          name,
          location,
          contact,
          shortDescription,
          longDescription,
          status,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.status(201).json(poi);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}

export async function getAllPOI(req: CustomRequest, res: Response) {
  try {
    const { limit, status } = req.query;
    let poi;

    if (status) {
      if (limit) {
        poi = await prisma.interestPointCategory
          .findMany({
            include: {
              interestPoints: {
                where: {
                  status: <InterestPointStatus>status,
                },
                include: {
                  images: true,
                },
                orderBy: {
                  status: "asc",
                },
                take: parseInt(limit as string),
              },
            },
          })
          .catch((e) => {
            res.status(400);
            throw e;
          });

        return res.json(poi);
      }

      poi = await prisma.interestPointCategory
        .findMany({
          include: {
            interestPoints: {
              where: {
                status: <InterestPointStatus>status,
              },
              include: {
                images: true,
              },
              orderBy: {
                status: "asc",
              },
            },
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });

      return res.json(poi);
    }

    poi = await prisma.interestPointCategory
      .findMany({
        include: {
          interestPoints: {
            include: {
              images: true,
            },
            orderBy: {
              status: "asc",
            },
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });
    res.json(poi);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function getByCategory(req: CustomRequest, res: Response) {
  try {
    const { categoryId } = req.params;

    const poi = await prisma.interestPointCategory
      .findMany({
        where: {
          id: categoryId,
        },
        include: {
          interestPoints: {
            include: {
              images: true,
            },
            orderBy: {
              status: "asc",
            },
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.json(poi);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function getOnePOI(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params;

    const poi = await prisma.interestPoint
      .findUnique({
        where: {
          id,
        },
        include: {
          images: true,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.json(poi);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function updatePOI(req: CustomRequest, res: Response) {
  try {
    const areParamsDefined = Object.values(req.body).some((value) => {
      return value ? true : false;
    });

    if (!areParamsDefined) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const { id } = req.params;

    const poi = await prisma.interestPoint.update({
      where: {
        id,
      },
      data: {
        name: req.body.name,
        location: req.body.location,
        contact: req.body.contact,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        categoryId: req.body.categoryId,
        images: {
          create: {
            url: req.body.img,
          },
        },
      },
    });

    res.status(201).json(poi);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message,
    });
  }
}

export async function deletePOI(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params;

    await prisma.interestPoint
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
