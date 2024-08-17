const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
        countSubcategory:mongoose.Types.Array,
        ref:"Subcategories"
})

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;