import { Response } from "express";
import { UsefulContactOwner } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function updateOwner(
  req: CustomRequest<UsefulContactOwner>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const category = await prisma.usefulContactOwner
      .update({
        where: {
          id,
        },
        data: {
          name,
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

export async function removeOwner(
  req: CustomRequest<UsefulContactOwner>,
  res: Response
) {
  try {
    const { id } = req.params;

    await prisma.usefulContactOwner
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

export async function postContact(req: CustomRequest, res: Response) {
  try {
    const { contact, owner, ownerId } = req.body;

    if (!contact && (!owner || !ownerId)) {
      res.status(400);
      throw Error("Missing parameters");
    }

    let newContact;

    if (!ownerId) {
      newContact = await prisma.usefulContact
        .create({
          data: {
            contact,
            usefulContactOwner: {
              create: {
                name: owner,
              },
            },
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });

      return res.status(201).json(newContact);
    }

    newContact = await prisma.usefulContact
      .create({
        data: {
          contact,
          usefulContactOwner: {
            connect: {
              id: ownerId,
            },
          },
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.status(201).json(newContact);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function updateContact(req: CustomRequest, res: Response) {
  try {
    const { id: contactId } = req.params;
    const { contact, ownerId, owner } = req.body;

    if (!contact && (!owner || !ownerId)) {
      res.status(400);
      throw Error("Missing parameters");
    }

    let updatedContact;

    if (!owner) {
      updatedContact = await prisma.usefulContact
        .update({
          where: {
            id: contactId,
          },
          data: {
            contact,
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });

      return res.json(updatedContact);
    }

    updatedContact = await prisma.usefulContact
      .update({
        where: {
          id: contactId,
        },
        data: {
          contact,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });

    res.json(updatedContact);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function removeContact(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params;

    await prisma.usefulContact
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

export async function getAll(req: CustomRequest, res: Response) {
  try {
    const contacts = await prisma.usefulContactOwner
      .findMany({
        include: {
          usefulContacts: true,
        },
      })
      .catch((e) => {
        res.status(400);
        throw e;
      });
    res.json(contacts);
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}
