const bcrypt = require("bcrypt");
const queries = require("./queries");

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
  console.log("SERVER: Trying to login a user");
  try {
    // Accessing the password given to us
    const user_pw = req.body.password;
    const user = req.body.username;

    // Getting password from database
    const db_pw = await queries.db_pw(user, user_pw);
    console.log(user_pw, db_pw);

    // Checking to make sure we recevied a password from the database
    if (db_pw === null) {
      console.log("There was no password for the provided username");
      res.status(500).send("There was no password for the provided username");
      return;
    }

    //Comparing the hashed password to the password in the database
    if (await bcrypt.compare(user_pw, db_pw)) {
      console.log("Correct password");
      res.status(200).send("You are logged in!");
      /*
        Give the user a json web token
      */
      return;
    }

    // The password that was provided was incorrect.
    console.log("Incorrect password");
    res.status(500).send("Failed to login");
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .send("An error has occured. Incorrect username or password entered.");
  }
};
