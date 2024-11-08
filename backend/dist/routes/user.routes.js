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
    const { user, error } = (0, user_controller_1.getUserByUsername)(req.body, users);
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
pageRouter.get("/profile", (req, res) => {
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
exports.default = pageRouter;
