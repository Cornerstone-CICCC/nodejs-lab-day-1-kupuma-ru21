import { Request } from "express";

export const createUser = (req: Request) => {
  console.log("Hello, World!", req);
};

const USER: User[] = [];
type User = {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
};
