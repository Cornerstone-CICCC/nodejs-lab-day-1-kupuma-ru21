import { Request } from "express";
import { createUser, findById, findByUsername } from "../models/user.model";
import { User } from "../routes/user.routes";
import crypto from "crypto";

export const addUser = (body: Request["body"]) => {
  return createUser(body);
};

export const getUserByUsername = (body: Request["body"], users: User[]) => {
  const user = findByUsername(body, users);
  if (user === null || !process.env.JWT_SECRET) return { user: null, jwt: "" };
  // Ref: https://qiita.com/knaot0/items/8427918564400968bd2b
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { sub: user.id, iat: Math.floor(Date.now() / 1000) };
  const unsignedToken = `${encodeBase64(header)}.${encodeBase64(payload)}`;
  const signature = HMAC_SHA256(process.env.JWT_SECRET, unsignedToken);
  const jwt = `${unsignedToken}.${signature}`;

  return { user, jwt };
};

export const getUserById = (
  authorization: string | undefined,
  users: User[]
) => {
  const SECRET = process.env.JWT_SECRET;
  if (!SECRET) return { user: null, error: "jwt secret not found" };

  if (!authorization) {
    return { user: null, error: "authorization header not found" };
  }

  const bearer = authorization.replace("Bearer", "").trim();
  if (bearer === "") return { user: null, error: "token not found" };

  const jwt = bearer.replace("token=", "").trim();
  const splits = jwt.split(".");
  const payload = splits[1];
  const unsignedToken = [splits[0], splits[1]].join(".");
  const signature = splits[2];
  if (HMAC_SHA256(SECRET, unsignedToken) !== signature) {
    return { user: null, error: "invalid token" };
  }

  const payloadDecoded = decodeBase64(payload);
  const user = findById(payloadDecoded.sub, users);
  if (user === null) return { user: null, error: "user not found" };

  return { user, error: null };
};

const encodeBase64 = (json: Record<string, string | number>) => {
  const jsonStr = JSON.stringify(json);
  const jsonB64 = Buffer.from(jsonStr).toString("base64");
  const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, "");
  return jsonB64NoPadding;
};

const HMAC_SHA256 = (key: string, data: string) => {
  const hash = crypto.createHmac("sha256", key).update(data).digest("base64");
  const hashNoPadding = hash.replace(/={1,2}$/, "");
  return hashNoPadding;
};

const decodeBase64 = (b64: string) => {
  const jsonStr = Buffer.from(b64, "base64").toString("utf-8");
  return JSON.parse(jsonStr);
};
