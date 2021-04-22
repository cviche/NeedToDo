const bcrypt = require("bcrypt");
const queries = require("./queries");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // Extracting username and password.
    const user = req.body.username;
    const pw = req.body.password;

    // Generating a hashed password to store into the database for security.
    const salt = await bcrypt.genSalt();
    const hashed_pw = await bcrypt.hash(user_pw, salt);

    // Storing user information into the database.
    const insert_successful = queries.register_user(user, hashed_pw);

    // Giving the user a JSON Web Token to make sure they stay logged in
    // once they finish creating their account.
    if (insert_successful) {
      console.log("Successful: The user has been created!");
      return res.status(200).send("You have successfully created an account!");
    } else {
      console.log("Unsuccessful: The user has not been created!");
      return res
        .status(500)
        .send("An error has occured while trying to register you.");
    }
  } catch {
    res.status(500).send("An error has occured while trying to register you.");
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
      res.status(500).send("There was no password for the provided username");
      return;
    }

    //Comparing the hashed password to the password in the database
    if (await bcrypt.compare(user_pw, db_pw)) {
      // Give the user a JSON Web token so they stay logged in
      const token = jwt.sign({ user: user }, "secret"); // NOTE: Change secret to environment variable
      console.log(token);
      res.status(200).json({ token });
      return;
    }

    // The password that was provided was incorrect.
    res.status(403).send("Incorrect password");
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .send("An error has occured. Incorrect username or password entered.");
    return;
  }
};

const verifyToken = (req, res, next) => {
  // Making sure we have a token
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Does not have token, so access forbidden
    res.sendStatus(403);
  }
};

exports.authenticate = (req, res) => {};
