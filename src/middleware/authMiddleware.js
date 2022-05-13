const jwt= require("jsonwebtoken")
require('dotenv').config( )

const verifyToken=(req,res,next)=>{
     const authHeader= req.headers['authorization']

     if(typeof authHeader!=='undefined'){
        const token = authHeader.split(' ')[1]
        
        jwt.verify(token,process.env.secret_key,(err,user)=>{
            if (err){ 
               return res.sendStatus(403)
        }
            req.user=user
            next()   
        })
     }
     else{
        res.sendStatus(403)
     }
}

module.exports=verifyToken