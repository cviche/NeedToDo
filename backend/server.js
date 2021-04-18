const express = require("express");
const app = express();
require("dotenv").config();
const frontend = process.env.FRONTEND_SERVER;
const port = process.env.PORT || 4000;
const cors = require("cors");
const api = require("./api");

app.use(cors({ origin: frontend }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", api.login);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
