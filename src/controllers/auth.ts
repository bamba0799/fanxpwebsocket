import { Request, Response } from "express";
import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  generateAccessToken,
  generateOTP,
  generateRefreshToken,
  verifyToken,
} from "../utils/auth";
import { redis } from "../lib/redis";
import { sendSMS } from "../utils/sms";

export async function getAuth(req: Request, res: Response) {
  const { contact } = req.body;

  try {
    if (!contact) {
      res.status(400);
      throw Error("Missing parameters");
    }

    // try to find a user
    const isUser = await prisma.user.findUnique({
      where: {
        contact,
      },
    });

    // register
    if (!isUser) {
      await prisma.user
        .create({
          data: {
            contact,
            profilePicture: {
              create: { image: undefined },
            },
          },
        })
        .catch((e) => {
          res.status(400);
          throw e;
        });
    }

    // generate OTP
    const OTP = generateOTP();
    await redis.set(OTP, contact).catch((e) => {
      res.status(424);
      throw e;
    });

    // send SMS
    await sendSMS({ phone: contact, OTP }).catch((e) => {
      res.status(422);
      throw e;
    });

    res.status(201).json("OK");
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function verifyOTP(req: Request, res: Response) {
  const { OTP } = req.body;

  try {
    if (!OTP) {
      res.status(400);
      throw Error("Missing parameters");
    }

    const contact = await redis.get(OTP);

    if (!contact) {
      res.status(403);
      throw Error("Invalid OTP");
    }

    const user = <User>await prisma.user.findUnique({
      where: { contact },
      select: {
        id: true,
        contact: true,
      },
    });

    // generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // delete OTP
    await redis.del(OTP);

    res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}

export async function refreshToken(req: Request, res: Response) {
  const { token } = req.body;

  try {
    if (!token) {
      res.status(403);
      throw new Error("You first need to be authenticated.");
    }

    const user = await verifyToken({ token, type: "refresh" }).catch((e) => {
      res.status(401);
      throw e;
    });

    // generate tokens
    const accessToken = generateAccessToken(<User>user);
    const refreshToken = generateRefreshToken(<User>user);

    res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (e: any) {
    res.json({
      name: e.name ?? "Error",
      message: e.message as string,
    });
  }
}
