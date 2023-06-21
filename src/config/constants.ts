import { config } from "dotenv";
import { resolve } from "path";

const ENV_FILE_PATH =
  process.env.NODE_ENV === "production"
    ? resolve(__dirname, "../../.env.prod")
    : resolve(__dirname, "../../.env.dev");

config({ path: ENV_FILE_PATH });

// API
export const PORT = process.env.PORT;

// JWT
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Redis
export const REDIS_URL = process.env.REDIS_URL;

// ORANGE SMS API
export const AUTHORIZATION_HEADER = process.env.AUTHORIZATION_HEADER;
