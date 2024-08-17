const mongoose = require("mongoose")

const shippingsSchema = new mongoose.Schema(
    {
        order_id:{
            type:mongoose.Types.ObjectId,
            ref:'Orders',
            required:true
        },
        carriers: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
        },
        current_place: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Shippings = mongoose.model('Shippings', shippingsSchema);
module.exports = Shippings