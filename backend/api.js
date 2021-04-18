const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  console.log("SERVER: Trying to login a user");
  try {
    const user_pw = req.body;
    console.log(user_pw);
    // const salt = await bcrypt.genSalt();
    // const hashed_pw = bcrypt.hash(user_pw, salt);
    res.send("You are logged in!");
  } catch (error) {
    console.log(error);
    res.send("An error has occured");
  }
};
