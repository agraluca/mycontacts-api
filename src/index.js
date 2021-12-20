import express from "express";
import "express-async-errors";

import routes from "./routes.js";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(routes);
app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(port, () => console.log("Server started"));
