const express = require("express");
const app = express();
require("dotenv").config();
const frontend = process.env.FRONTEND_SERVER;
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(cors({ origin: frontend }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/authenticate", (req, res) => {
  res.send("You are authenticated!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
