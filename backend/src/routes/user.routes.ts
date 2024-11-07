import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/signup", (_, res) => {
  res.end("Hello, World!");
});

export default pageRouter;
