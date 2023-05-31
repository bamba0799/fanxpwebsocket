import jwt from "jsonwebtoken";
import * as constants from "../config/constants";

export function generateAccessToken<T extends { id: string; contact: string }>(
  payload: T
) {
  return jwt.sign(
    {
      userId: payload.id,
      contact: payload.contact,
    },
    <string>constants.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

export function generateRefreshToken<T extends { id: string; contact: string }>(
  payload: T
) {
  return jwt.sign(
    {
      userId: payload.id,
      contact: payload.contact,
    },
    <string>constants.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
}

export function generateOTP(length = 4) {
  const digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}
