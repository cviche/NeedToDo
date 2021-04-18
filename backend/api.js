const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  console.log("SERVER: Trying to login a user");
  try {
    //   let hi1 = req.body.
    const user_pw = req.body;
    // console.log(req);
    console.log(user_pw);
    console.log("hi");
    // const salt = await bcrypt.genSalt();
    // const hashed_pw = bcrypt.hash(user_pw, salt);
    res.send("You are logged in!");
  } catch (error) {
    console.log(error);
    res.send("An error has occured");
  }
};
