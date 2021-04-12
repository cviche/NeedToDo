const { Pool, Client } = require("pg");
const connectionString =
  "postgres://ipdxkxkn:lDUe4SwhWc2L3JnkEvJoSVrzCBRPVLOa@kashin.db.elephantsql.com:5432/ipdxkxkn";
const pool = new Pool({
  connectionString,
});

// userinfo parameter contains:
//  - userinfo.username (e.g., "cviche", "elon", "cool_user")
//  - userinfo.password (e.g, "uidjFJG88jFjmmnjNFIji9")
//      - Note: The password is hashed to strengthen security.
exports.insertUserInfo = async (userinfo) => {};
