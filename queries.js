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
    const find_username = `SELECT username FROM userinfo WHERE username= '${username}'`;
    const user_found = await pool.query(find_username);
    if (user_found.rows.length !== 0) {
      return false;
    } else {
      const insert_user = `INSERT INTO userinfo VALUES('${username}', '${password}')`;
      const user_inserted = await pool.query(insert_user);
      return true;
    }
  } catch (error) {
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

    if (db_pw.rows.length === 0) return null;
    return db_pw.rows[0].password;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.add_task = async (username, task) => {
  try {
    // Inserting the task associated with the user
    const insert_task = `INSERT INTO usernotes VALUES('${username}', '${task}')`;
    const task_inserted = await pool.query(insert_task);
    return task_inserted.rowCount;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.fetch_task = async (username) => {
  try {
    // Fetches the user's tasks
    const fetch_task = `SELECT message FROM usernotes WHERE username='${username}'`;
    const task_fetched = await pool.query(fetch_task);
    return task_fetched;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.remove_task = async (username, task) => {
  try {
    // Fetches the user's tasks
    const delete_task = `DELETE FROM usernotes WHERE username='${username}' AND message='${task}'`;
    const task_deleted = await pool.query(delete_task);
    return task_deleted.rowCount;
  } catch (error) {
    console.log(error);
    return false;
  }
};
