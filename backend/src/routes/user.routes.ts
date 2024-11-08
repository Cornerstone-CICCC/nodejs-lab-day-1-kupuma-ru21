import { Request, Router } from "express";
import { addUser, getUserByUsername } from "../controllers/user.controller";

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
  const { user, error } = getUserByUsername(req.body, users);
  if (user) {
    res.setHeader("Content-Type", "application/json");
    // TODO: change userName to jwt token
    res.send({ success: true, userName: user.userName });
  }
  if (error) {
    res.setHeader("Content-Type", "application/json");
    res.send({ success: false, error });
  }
});

pageRouter.get("/profile", (req: Request, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.setHeader("Content-Type", "application/json");
    res.send({ user: null, error: "No authorization header" });
    return;
  }

  const bearer = authorization.replace("Bearer", "").trim();
  if (bearer === "") {
    res.setHeader("Content-Type", "application/json");
    res.send({ user: null, error: "No token" });
    return;
  }

  console.log("bearer", bearer);
  const token = bearer.replace("token=", "").trim();
  console.log("token", token);
  const user = users.find((u) => u.userName === token);
  console.log("user", user);
  if (!user) {
    res.setHeader("Content-Type", "application/json");
    res.send({ user: null, error: "No user found" });
    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.send({ user, error: null });
});

export default pageRouter;
