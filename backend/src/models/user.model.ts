import e, { Request } from "express";
import { v4 as uuid } from "uuid";
import { User } from "../routes/user.routes";

export const createUser = (body: Request["body"]) => {
  const user = {
    id: uuid(),
    userName: body.userName,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  };
  return user;
};

export const findByUsername = (body: Request["body"], users: User[]) => {
  const user = users.find((user) => user.userName === body.userName);
  console.log("users", users);
  console.log("user", user);

  if (user === undefined) return { user: null, error: "User not found" };
  if (user.password !== body.password) {
    return { user: null, error: "Password is incorrect" };
  }
  return { user, error: null };
};
