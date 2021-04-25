const bcrypt = require("bcrypt");
const queries = require("./queries");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // Extracting username and password.
    console.log("in register api");
    console.log(req.body);
    const user = req.body.username;
    const pw = req.body.password;
    console.log("hi");

    // Generating a hashed password to store into the database for security.
    const salt = await bcrypt.genSalt();
    const hashed_pw = await bcrypt.hash(pw, salt);

    // Storing user information into the database.
    console.log("Before insert succ");

    const insert_successful = await queries.register_user(user, hashed_pw);
    console.log("After insert succ");

    // Giving the user a JSON Web Token to make sure they stay logged in
    // once they finish creating their account.
    if (insert_successful) {
      console.log("Successful: The user has been created!");
      return exports.login(req, res);
      // return res.status(200).send("You have successfully created an account!");
    } else {
      console.log("Unsuccessful: The user has not been created!");
      return res
        .status(500)
        .send("An error has occured while trying to register you.");
    }
  } catch {
    console.log("error");
    return res
      .status(500)
      .send("An error has occured while trying to register you.");
  }
};

exports.login = async (req, res) => {
  console.log("API: Trying to login a user");
  try {
    // Accessing the password given to us
    const user_pw = req.body.password;
    const user = req.body.username;

    // Getting password from database
    const db_pw = await queries.db_pw(user, user_pw);

    // Checking to make sure we recevied a password from the database
    if (db_pw === null) {
      return res
        .status(500)
        .send("There was no password for the provided username");
    }

    //Comparing the hashed password to the password in the database
    if (await bcrypt.compare(user_pw, db_pw)) {
      // Give the user a JSON Web token so they stay logged in
      const token = jwt.sign({ user: user }, "secret"); // NOTE: Change secret to environment variable
      console.log(token);
      return res.status(200).json({ token });
    }

    // The password that was provided was incorrect.
    res.status(403).send("Incorrect password");
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .send("An error has occured. Incorrect username or password entered.");
  }
};

exports.authenticate = (req, res) => {
  const data = verifyToken(req, res, null);
  console.log(data);
  return data;
};

exports.addTask = async (req, res) => {
  try {
    console.log("API: Trying to add a task");
    // Accessing the password given to us
    const task = req.body.task;
    const user = req.body.username;
    console.log(task, user);

    // Getting password from database
    const add_task_successful = await queries.add_task(user, task);
    if (add_task_successful == true) {
      return res
        .status(200)
        .send("Task inserted into the database successfully");
    }
  } catch (error) {
    console.log(error);
    console.log("There was an error inside of api.js");
    return res.status(500).send("Task not inserted. An error occurred");
  }
};
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "secret", (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    console.log(
      "We have successfully authenticated the user. This token is valid"
    );
    return res.status(200).json(user);
  });
};
