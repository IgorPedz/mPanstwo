const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

db.getConnection()
  .then((connection) => {
    console.log("Połączono z MySQL");
    connection.release();
  })
  .catch((error) => {
    console.error("Błąd połączenia z MySQL:", error);
    process.exit(1);
  });

module.exports = db;
