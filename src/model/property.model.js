const db=require('../config/db');


class Property{
    constructor(owner_id,status,price,state, city, address,type,image_url){
        this.owner_id=owner_id
        this.status=status
        this.price=price
        this.state=state
        this.city=city
        this.address=address
        this.type=type
        this.image_url=image_url
    }

    static createProperty(newProp,result){
            let sql='INSERT INTO properties (owner_id, status, price, state, city, address, type, image_url) VALUES (?,?,?,?,?,?,?,?)';

            db.query(sql,[newProp.owner_id, newProp.status, newProp.price, newProp.state, newProp.city, newProp.address, newProp.type, newProp.image_url],(err,res,fields)=>{
                if(err){
                    console.log('Error: ', err);
                    result(err)
                    return
                }
                console.log("Property created :", newProp);
                result(null,{ property: res})
            })
    }
}

module.exports= Property