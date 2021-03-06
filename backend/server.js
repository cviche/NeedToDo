require("dotenv").config();
const express = require("express");
const app = express();
const frontend = process.env.FRONTEND_SERVER;
const port = process.env.PORT || 4000;
const cors = require("cors");
const api = require("./api");

// Gives the frontend access to make HTTP methods listed below.
app.use(
  cors({
    origin: frontend,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Lets the server accept JSON
app.use(express.json());

// Root directory call
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// User login route
app.post("/login", api.login);

// Authenticate route
app.get("/authenticate", api.authenticate);

// Register route
app.post("/register", api.register);

// Add task route
app.post("/addTask", api.addTask);

// Fetch task route
app.post("/fetchTask", api.fetchTask);

// Remove task route
app.post("/removeTask", api.removeTask);

// Server listenting to address
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}\n`);
});
