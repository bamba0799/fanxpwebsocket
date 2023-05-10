import { Response } from "express";
import { InterestPoint, InterestPointCategory } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

// category
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
    const areParamsDefined = Object.values(req.body).some((value) => {
      return value ? true : false;
    });

    if (!areParamsDefined) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const poi = await prisma.interestPoint
      .create({
        data: {
          name: req.body.name,
          location: req.body.location,
          contact: req.body.contact,
          shortDescription: req.body.shortDescription,
          longDescription: req.body.longDescription,
          categoryId: req.body.categoryId,
          image: {
            create: {
              url: req.body.img,
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

export async function getAllPOI(
  req: CustomRequest<InterestPoint>,
  res: Response
) {
  try {
    const poi = await prisma.interestPoint.findMany().catch((e) => {
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
    const { categoryId } = req.params;

    const poi = await prisma.interestPoint
      .findMany({
        where: {
          categoryId,
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
        image: {
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
