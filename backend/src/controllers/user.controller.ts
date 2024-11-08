import { Request } from "express";
import { createUser, findByUsername } from "../models/user.model";
import { User } from "../routes/user.routes";

export const addUser = (body: Request["body"]) => {
  return createUser(body);
};

export const getUserByUsername = (body: Request["body"], users: User[]) => {
  return findByUsername(body, users);
};
