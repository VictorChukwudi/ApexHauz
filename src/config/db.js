require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  multipleStatements: true,
});

const database = process.env.database;
let sql = `CREATE DATABASE IF NOT EXISTS ${database}`;
//Database Connection and Creation
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL is connected");

  //create database
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Database Created");
  });

  // switching to database
  db.query(`use ${database}`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Switched to Database Created");
  });

  //creating users table
  sql = `CREATE TABLE IF NOT EXISTS users 
    (id INT AUTO_INCREMENT, 
    email VARCHAR(30) NOT NULL UNIQUE, 
    firstname VARCHAR(20) NOT NULL, 
    lastname VARCHAR(20) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    phone VARCHAR(20) NOT NULL, 
    address VARCHAR(50) NOT NULL, 
    is_admin BOOLEAN NOT NULL, 
    PRIMARY KEY (id))`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("User Table Created");
  });

  //creating property table
  sql = `CREATE TABLE IF NOT EXISTS properties (prop_id INT AUTO_INCREMENT,
    owner_id INT , 
    status VARCHAR(100)  DEFAULT 'available', 
    price FLOAT NOT NULL, 
    state VARCHAR(255) NOT NULL, 
    city VARCHAR(255) NOT NULL, 
    address VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,  
    image_url VARCHAR(255) NOT NULL,
    cloudinary_id VARCHAR(255) NOT NULL,
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(prop_id),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Property Table Created");
    console.log("--------------------------------");
  });
});

module.exports = db;
