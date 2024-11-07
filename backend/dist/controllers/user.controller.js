"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const user_model_1 = require("../models/user.model");
const addUser = (req) => {
    (0, user_model_1.createUser)(req);
};
exports.addUser = addUser;
