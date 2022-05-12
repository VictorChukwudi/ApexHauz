const User=require('../model/user.model')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')


const sign_up=(req,res)=>{
    // check if sign_up data is given
    if(!req.body){
        res.status(400).json({
            message:"Content cannot be empty"
        })
    }

    let {email,firstname,lastname,password,phone,address,is_admin}=req.body;

        //Encrypting Password
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
            password=hash;

            const user= new User(email,firstname,lastname,password,phone,address,is_admin)
        
          //Creating new user
    User.create(user,(err,user)=>{
        if(err){
            res.status(500).json({
                status:'failed',
                message:'Email has already been used'
            })
        }

         // Generating JWT token
         jwt.sign({id: user.id, email: user.email}, process.env.secret_key,(err,token)=>{

            // Data sent when the endpoint is successful
        res.status(201).json({
        status:'success',
        token:token,
        data:{
        id: user.id,
        first_name:user.firstname,
        last_name:user.lastname,
        email:user.email
            }
        });
            }) 
    })
})
    })
}


const sign_in=(req,res)=>{
    res.send('signin')
}

module.exports={
    sign_in,
    sign_up
}
