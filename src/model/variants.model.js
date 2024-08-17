const mongoose = require("mongoose")

const imageSchema= new mongoose.Schema(
    {
        public_id:String,
        url:String
    }
)

const variantsSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            required: true
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Subcategories',
            required: true
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        attributes: {},
        variant_img:[imageSchema],
        isActive: {
            type: Boolean,
            default: true
        },        
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Variants = mongoose.model("Variants", variantsSchema);
module.exports = Variants