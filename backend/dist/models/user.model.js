"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUsername = exports.createUser = void 0;
const uuid_1 = require("uuid");
const createUser = (body) => {
    const user = {
        id: (0, uuid_1.v4)(),
        userName: body.userName,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
    };
    return user;
};
exports.createUser = createUser;
const findByUsername = (body, users) => {
    const user = users.find((user) => user.userName === body.userName);
    console.log("users", users);
    console.log("user", user);
    if (user === undefined)
        return { user: null, error: "User not found" };
    if (user.password !== body.password) {
        return { user: null, error: "Password is incorrect" };
    }
    return { user, error: null };
};
exports.findByUsername = findByUsername;
