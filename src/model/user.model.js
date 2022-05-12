const { NULL } = require('mysql/lib/protocol/constants/types');
const db=require('../config/db')

class User{
    constructor(email,firstname,lastname,password,phone,address,is_admin) {
        // this.id=id;
        this.email=email;
        this.firstname=firstname;
        this.lastname=lastname;
        this.password=password;
        this.phone=phone;
        this.address=address;
        this.is_admin=is_admin;
    }

    static create (newUser,result){
        let sql='INSERT INTO users (email, firstname, lastname, password, phone, address, is_admin) VALUES (?,?,?,?,?,?,?)';
        db.query(sql,[newUser.email, newUser.firstname, newUser.lastname, newUser.password, newUser.phone, newUser.address, newUser.is_admin], (err,res)=>{
            if(err){
                console.log(err);
                result(err,NULL);
                return;
            }
            console.log("Created User",{newUser});
            result(null,{id:res.insertId,...newUser});
        })
    }

    static findByEmail(email,result){
        let sql='SELECT * FROM users WHERE email= ?';
        db.query(sql,[email],(err,res)=>{
            if(err){
                console.log("Error: ",err);
                result(err,null)
                return;
            }
            if(res){
                console.log('User found: ', res[0]);
            result(null,res[0]);
            return;
            }
            console.log("user not flound");
            result({kind:'not_found'},null);
        })
    }
}

module.exports=User;