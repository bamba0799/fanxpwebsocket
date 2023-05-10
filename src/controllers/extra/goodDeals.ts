import { Response } from "express";
import { GoodDeal } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function post(req: CustomRequest<GoodDeal>, res: Response) {
  try {
    const { image, interestPointId } = req.body;

    if (!image || !interestPointId) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const deal = await prisma.goodDeal
      .create({
        data: {
          image,
          interestPoint: {
            connect: {
              id: interestPointId,
            },
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.status(201).json(deal);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function getAll(req: CustomRequest, res: Response) {
  try {
    const deals = await prisma.goodDeal.findMany().catch((e) => {
      res.status(400);
      throw e;
    });
    res.json(deals);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function update(req: CustomRequest<GoodDeal>, res: Response) {
  try {
    const { id } = req.params;
    const { image } = req.body;

    if (!image) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const category = await prisma.goodDeal
      .update({
        where: {
          id,
        },
        data: {
          image,
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

export async function remove(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params;

    await prisma.goodDeal
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
