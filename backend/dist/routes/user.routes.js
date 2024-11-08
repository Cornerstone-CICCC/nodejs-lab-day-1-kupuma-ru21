"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const pageRouter = (0, express_1.Router)();
const users = [];
pageRouter.post("/signup", (req, res) => {
    users.push((0, user_controller_1.addUser)(req.body));
    res.setHeader("Content-Type", "application/json");
    res.send({ success: true });
});
pageRouter.post("/login", (req, res) => {
    const { user, jwt } = (0, user_controller_1.getUserByUsername)(req.body, users);
    if (user === null) {
        res.setHeader("Content-Type", "application/json");
        res.send({ success: false });
        return;
    }
    res.setHeader("Content-Type", "application/json");
    res.send({ success: true, jwt });
});
pageRouter.get("/profile", (req, res) => {
    const { user, error } = (0, user_controller_1.getUserById)(req.headers.authorization, users);
    if (error) {
        res.setHeader("Content-Type", "application/json");
        res.send({ user: null, error });
        return;
    }
    res.setHeader("Content-Type", "application/json");
    res.send({ user, error: null });
});
exports.default = pageRouter;
