"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.addUser = void 0;
const user_model_1 = require("../models/user.model");
const addUser = (body) => {
    return (0, user_model_1.createUser)(body);
};
exports.addUser = addUser;
const getUserByUsername = (body, users) => {
    return (0, user_model_1.findByUsername)(body, users);
};
exports.getUserByUsername = getUserByUsername;
