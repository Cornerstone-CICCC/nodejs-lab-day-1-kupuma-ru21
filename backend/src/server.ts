import express from "express";
import path from "path";
import pageRouter from "./routes/user.routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 8080;

console.log(process.env.COOKIE_KEY);

app.use(cookieParser(process.env.COOKIE_KEY));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

app.use("/", pageRouter);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
