require('dotenv').config()
const mysql=require('mysql')

const db =mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    multipleStatements: true
});

const database=process.env.database;

//Database Connection and Creation
db.connect((err)=>{
    if(err) throw err;
    console.log('MySQL is connected');

    //create database
    db.query(`CREATE DATABASE IF NOT EXISTS ${database}`,(err,result)=>{
        if (err){throw err}
        console.log('Database Created');
    })

    // switching to database
    db.query(`use ${database}`,(err,result)=>{
        if (err) {throw err}
        console.log('Switched to Database Created');
    })

    //creating users table
    var sql=`CREATE TABLE IF NOT EXISTS users 
    (id INT AUTO_INCREMENT, 
    email VARCHAR(30) UNIQUE, 
    firstname VARCHAR(20), 
    lastname VARCHAR(20), 
    password VARCHAR(255), 
    phone VARCHAR(20), 
    address VARCHAR(50), 
    is_admin BOOLEAN, 
    PRIMARY KEY (id))`;
    db.query(sql,(err,result)=>{
        if(err){throw err}
        console.log('User Table Created');
    })

    //creating property table
    var sql=`CREATE TABLE IF NOT EXISTS properties (prop_id INT AUTO_INCREMENT,
    owner_id INT, 
    status VARCHAR(100)  DEFAULT 'available', 
    price FLOAT, 
    state VARCHAR(255)  , 
    city VARCHAR(255), 
    address VARCHAR(255),
    type VARCHAR(255), 
    image_url VARCHAR(255), 
    cloudinary_id VARCHAR(255),
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(prop_id),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    db.query(sql,(err,result)=>{
        if(err){throw err}
        console.log('Property Table Created');
        console.log('--------------------------------');
    })
});


module.exports=db;