"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByUsername = exports.addUser = void 0;
const user_model_1 = require("../models/user.model");
const crypto_1 = __importDefault(require("crypto"));
const addUser = (body) => {
    return (0, user_model_1.createUser)(body);
};
exports.addUser = addUser;
const getUserByUsername = (body, users) => {
    const user = (0, user_model_1.findByUsername)(body, users);
    if (user === null || !process.env.JWT_SECRET)
        return { user: null, jwt: "" };
    // Ref: https://qiita.com/knaot0/items/8427918564400968bd2b
    const header = { alg: "HS256", typ: "JWT" };
    const payload = { sub: user.id, iat: Math.floor(Date.now() / 1000) };
    const unsignedToken = `${encodeBase64(header)}.${encodeBase64(payload)}`;
    const signature = HMAC_SHA256(process.env.JWT_SECRET, unsignedToken);
    const jwt = `${unsignedToken}.${signature}`;
    return { user, jwt };
};
exports.getUserByUsername = getUserByUsername;
const getUserById = (authorization, users) => {
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET)
        return { user: null, error: "jwt secret not found" };
    if (!authorization) {
        return { user: null, error: "authorization header not found" };
    }
    const bearer = authorization.replace("Bearer", "").trim();
    if (bearer === "")
        return { user: null, error: "token not found" };
    const jwt = bearer.replace("token=", "").trim();
    const splits = jwt.split(".");
    const payload = splits[1];
    const unsignedToken = [splits[0], splits[1]].join(".");
    const signature = splits[2];
    if (HMAC_SHA256(SECRET, unsignedToken) !== signature) {
        return { user: null, error: "invalid token" };
    }
    const payloadDecoded = decodeBase64(payload);
    const user = (0, user_model_1.findById)(payloadDecoded.sub, users);
    if (user === null)
        return { user: null, error: "user not found" };
    return { user, error: null };
};
exports.getUserById = getUserById;
const encodeBase64 = (json) => {
    const jsonStr = JSON.stringify(json);
    const jsonB64 = Buffer.from(jsonStr).toString("base64");
    const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, "");
    return jsonB64NoPadding;
};
const HMAC_SHA256 = (key, data) => {
    const hash = crypto_1.default.createHmac("sha256", key).update(data).digest("base64");
    const hashNoPadding = hash.replace(/={1,2}$/, "");
    return hashNoPadding;
};
const decodeBase64 = (b64) => {
    const jsonStr = Buffer.from(b64, "base64").toString("utf-8");
    return JSON.parse(jsonStr);
};
