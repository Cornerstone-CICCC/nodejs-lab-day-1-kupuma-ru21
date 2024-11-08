import { Request, Router } from "express";
import {
  addUser,
  getUserById,
  getUserByUsername,
} from "../controllers/user.controller";

const pageRouter = Router();

export type User = {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
};

const users: User[] = [];

pageRouter.post("/signup", (req: Request, res) => {
  users.push(addUser(req.body));
  res.setHeader("Content-Type", "application/json");
  res.send({ success: true });
});

pageRouter.post("/login", (req: Request, res) => {
  const { user, jwt } = getUserByUsername(req.body, users);
  if (user === null) {
    res.setHeader("Content-Type", "application/json");
    res.send({ success: false });
    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.send({ success: true, jwt });
});

pageRouter.get("/profile", (req: Request, res) => {
  const { user, error } = getUserById(req.headers.authorization, users);
  if (error) {
    res.setHeader("Content-Type", "application/json");
    res.send({ user: null, error });
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.send({ user, error: null });
});

export default pageRouter;
