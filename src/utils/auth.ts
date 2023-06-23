import jwt, { verify } from "jsonwebtoken";
import * as constants from "../config/constants";

type TokenType = "access" | "refresh";

type VerifyTokenProps = {
  token: string;
  type: TokenType;
};

export function generateAccessToken<T extends { id: string; contact: string }>(
  payload: T
) {
  return jwt.sign(
    {
      id: payload.id,
      contact: payload.contact,
    },
    <string>constants.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
}

export function generateRefreshToken<T extends { id: string; contact: string }>(
  payload: T
) {
  return jwt.sign(
    {
      id: payload.id,
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

export function verifyToken(
  props: VerifyTokenProps
): Promise<string | jwt.JwtPayload> {
  let SECRET: string;

  if (props.type === "access") {
    SECRET = <string>constants.ACCESS_TOKEN_SECRET;
  } else {
    SECRET = <string>constants.REFRESH_TOKEN_SECRET;
  }

  return new Promise((resolve, rejected) => {
    verify(props.token, SECRET, (e, payload) => {
      if (e) return rejected(e);
      resolve(payload!);
    });
  });
}
