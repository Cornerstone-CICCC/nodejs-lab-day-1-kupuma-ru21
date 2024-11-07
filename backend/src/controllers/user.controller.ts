import { Request } from "express";
import { createUser } from "../models/user.model";

export const addUser = (req: Request) => {
  createUser(req);
};
