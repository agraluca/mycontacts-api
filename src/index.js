import express from "express";

import cors from "./app/middlewares/cors.js";
import errorHandler from "./app/middlewares/errorHandler.js";

import env from "dotenv";
import "express-async-errors";

import routes from "./routes.js";

env.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler());

app.listen(port, () => console.log("Server started"));
