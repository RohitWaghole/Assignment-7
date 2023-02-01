const mysql = require("mysql2");
module.exports = mysql.createConnection({
  host: process.env.DB_HOST || "mysqldb",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "rohit@11",
  database: process.env.DB_NAME || "myMysql",
  port: 3306 || process.env.DB_PORT,
});
