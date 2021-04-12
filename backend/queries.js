const { Pool, Client } = require("pg");
require("dotenv").config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const db_name = process.env.DB_NAME;
const connectionString = `postgres://${username}:${password}@${host}/${db_name}`;
const pool = new Pool({
  connectionString,
});

// userinfo parameter contains:
//  - userinfo.username (e.g., "cviche", "elon", "cool_user")
//  - userinfo.password (e.g, "uidjFJG88jFjmmnjNFIji9")
//      - Note: The password is hashed to strengthen security.
exports.insertUserInfo = async (userinfo) => {};
