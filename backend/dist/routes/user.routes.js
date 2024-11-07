"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const pageRouter = (0, express_1.Router)();
pageRouter.get("/signup", (req, res) => {
    (0, user_controller_1.addUser)(req.body);
    res.end("Hello, World!");
});
exports.default = pageRouter;
