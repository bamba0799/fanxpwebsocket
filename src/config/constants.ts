import { config } from "dotenv";

config();

// API
export const PORT = process.env.PORT;

// JWT
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Redis
export const REDIS_URL = process.env.REDIS_URL;

// ORANGE SMS API
export const AUTHORIZATION_HEADER = process.env.AUTHORIZATION_HEADER;
