const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/authenticate", (req, res) => {
  res.send("You are authenticated!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
