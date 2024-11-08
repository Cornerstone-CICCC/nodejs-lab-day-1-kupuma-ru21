"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.findByUsername = exports.createUser = void 0;
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
        return null;
    if (user.password !== body.password) {
        return null;
    }
    return user;
};
exports.findByUsername = findByUsername;
const findById = (id, users) => {
    var _a;
    return (_a = users.find((user) => user.id === id)) !== null && _a !== void 0 ? _a : null;
};
exports.findById = findById;
