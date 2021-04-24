const { Pool } = require("pg");
require("dotenv").config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const db_name = process.env.DB_NAME;
const connectionString = `postgres://${username}:${password}@${host}/${db_name}`;
const pool = new Pool({
  connectionString,
});

// Registers a user into the database.
exports.register_user = async (username, password) => {
  try {
    // Check to see if the username is already in the database
    console.log(username, password);
    const find_username = `SELECT username FROM userinfo WHERE username= '${username}'`;
    const user_found = await pool.query(find_username);
    console.log(user_found.rows);
    if (user_found.rows.length !== 0) {
      console.log("We have found a user, return false");
      return false;
    } else {
      console.log("in inserting");
      const insert_user = `INSERT INTO userinfo VALUES('${username}', '${password}')`;
      const user_inserted = await pool.query(insert_user);
      console.log(user_inserted);
      return true;
    }
  } catch (error) {
    console.log("Something was wrong with the query");
    console.log(error);
    return false;
  }
};

exports.db_pw = async (username, password) => {
  try {
    // Check to see if the username is already in the database
    const find_db_pw = `SELECT password FROM userinfo WHERE username = '${username}'`;
    const values = [username, password];
    const db_pw = await pool.query(find_db_pw);
    console.log("QUERIES: Successfully retrieved the user's password");
    // console.log(db_pw);

    if (db_pw.rows.length === 0) return null;
    return db_pw.rows[0].password;
  } catch (error) {
    console.log(
      "QUERIES: There was an error when trying to fetch the user's password."
    );
    console.log(error);
    return null;
  }
};
