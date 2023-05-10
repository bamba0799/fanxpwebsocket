import { Response } from "express";
import { Group } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CustomRequest } from "./types";

export async function findAll(req: CustomRequest<Group>, res: Response) {
  // TODO: ...
}

export async function findOne(req: CustomRequest<Group>, res: Response) {
  // TODO: ...
}
