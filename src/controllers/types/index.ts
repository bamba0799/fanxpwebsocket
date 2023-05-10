import { Request } from "express";

export interface CustomRequest<T = any> extends Request {
  body: T;
}
