"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pageRouter = (0, express_1.Router)();
pageRouter.get("/signup", (_, res) => {
    res.end("Hello, World!");
});
exports.default = pageRouter;
