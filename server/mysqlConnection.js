const mysql = require("mysql2/promise");
let connection;

async function mysqlConnection() {
  if (connection) return connection;
  connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  return connection;
}

module.exports = mysqlConnection;
