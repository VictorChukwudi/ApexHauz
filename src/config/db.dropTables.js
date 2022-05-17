require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  multipleStatements: true,
});


let sql = `DROP TABLE IF  EXISTS properties`;

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL is connected");


  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Properties Table Deleted");
  });
    sql='DROP TABLE IF EXISTS users';
  db.query(sql,(err,result)=>{
    if (err) {
        console.log(err);
        return;
      }
      console.log("Users Table Deleted");
    });
  })
;

