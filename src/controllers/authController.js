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


//Sign in Controller
const sign_in=(req,res)=>{
    const {email,password}=req.body;
    //Checking for email and password entered
    if(!email && !password){
        res.status(400).json({
            message:'All fields required'
        })
    }
    //Finding user in database
    User.findByEmail(email,(err,user)=>{
        if (err){
            res.status(500).json({
                status:'Error',
                message:'Server error'
            })
        }
        if(!user){
            res.status(200).json({
                status:'success',
                message:'user not found'
            })
        }
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err){
                console.log(err);
            }
            if (isMatch){
            jwt.sign({id:user.id,email:user.email},process.env.secret_key,(err,token)=>{
                res.status(201).json({
                    status:'success',
                    token:token,
                    data:{
                    id: user.id,
                    first_name:user.firstname,
                    last_name:user.lastname,
                    email:user.email
                            }
                        })
                })
            }
        })
    })
    
}

module.exports={
    sign_in,
    sign_up
}
