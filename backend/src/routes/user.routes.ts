import { Request, Router } from "express";
import { addUser } from "../controllers/user.controller";

const pageRouter = Router();

pageRouter.get("/signup", (req: Request, res) => {
  addUser(req.body);
  res.end("Hello, World!");
});

export default pageRouter;
