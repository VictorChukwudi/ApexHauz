require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  multipleStatements: true,
});


let sql = `DROP DATABASE IF  EXISTS ${process.env.database}`;
//Database Connection
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL is connected");

  //Delete database
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Database Deleted");
  });
});

