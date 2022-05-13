const Property = require('../model/property.model')
const db=require('../model/property.model')

const cloudinary =require('../utils/cloudinary')
const upload = require('../utils/multer')


const create_prop=(req,res)=>{
    let owner_id=req.user.id
    
    if(!req.body){
        res.status(400).json({
            message:'All fields must be filled'
        })
    }

    
    
    cloudinary.uploader.upload(req.file.path,(err,result)=>{
        if(err){ throw err}

        let{status,price,state,city,address,type}=req.body

        let image_url=result.secure_url

        const property= new Property(owner_id,status,price,state,city,address,type,image_url)


        Property.createProperty(property,(err,prop)=>{
            if(err){
                res.status(500).json({
                    status:"failed",
                    message:"Error occured while creating property"
                })
            }
            res.status(201).json({
                status:'success',
                data:{
                    id:property.owner_id,
                    status:property.status,
                    type:property.type,
                    state:property.state,
                    city:property.city,
                    address:property.address,
                    price:property.price,
                    created_on: property.created_on,
                    image_url:property.image_url
                }
            })
        })

    })

}


module.exports={
    create_prop
}