import { Redis } from "ioredis";
import { REDIS_URL } from "../config/constants";

export const redis = new Redis(<string>REDIS_URL);
