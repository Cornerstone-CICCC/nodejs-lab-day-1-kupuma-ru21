import { Router } from "express";
import { addUser } from "../controllers/user.controller";

const pageRouter = Router();

pageRouter.get("/signup", (_, res) => {
  addUser();
  res.end("Hello, World!");
});

export default pageRouter;
