"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
console.log(process.env.COOKIE_KEY);
app.use((0, cookie_parser_1.default)(process.env.COOKIE_KEY));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.use("/", user_routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
