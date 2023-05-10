import { Response } from "express";
import { Team } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { CustomRequest } from "../types";

export async function findAll(req: CustomRequest<Team>, res: Response) {
  // TODO: ...
}
