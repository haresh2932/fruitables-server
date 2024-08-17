const mongoose = require("mongoose")

const itemSchema=new mongoose.Schema(
    {
        pid:{
            type:mongoose.Types.ObjectId,
            ref:'Products',
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        }
    }
)

const  cartsSchema= new mongoose.Schema(
    {
        user_id:{
            type:mongoose.Types.ObjectId,
            ref:'Users',
            required:true
        },
        items:[itemSchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Carts=mongoose.model("Carts",cartsSchema);
module.exports=Carts