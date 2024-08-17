const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            // required:true
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Subcategories',
            required: true
        },
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            // required:true
        },
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        product_img: {
            type: {
                public_id: String,
                url: String
            },
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

const Products = mongoose.model('Products', productsSchema);
module.exports = Products