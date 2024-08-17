const Subcategories = require("../model/subcategories.model");

const listSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategories.find()
        console.log(subcategories);


        if (!subcategories || subcategories.length === 0) {
            res.status(404).json({
                success: false,
                message: "Subcategories data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Subcategories data fetched",
            data: subcategories,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getSubcategory = async (req, res) => {
    try {
        const subcategories = await Subcategories.findById(req.params.subcategory_id)
        if (!subcategories) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Subcategory Data fetched",
            data: subcategories
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const subcategories = await Subcategories.find({ category_id: req.params.category_id })
        console.log(subcategories);
        if (!subcategories) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Subcategory Data fetched",
            data: subcategories
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}



const addSubcategory = async (req, res) => {
    console.log(req.body);
    try {
        const subcategory = await Subcategories.create(req.body);
        if (!subcategory) {
            res.status(400).json({
                success: true,
                message: "failed to added subcategory",
                data: subcategory,
            });
        }
        res.status(201).json({
            success: true,
            message: "subcategory added successfully",
            data: subcategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }



}

const updateSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategories.findByIdAndUpdate(
            req.params.subcategory_id,
            req.body,
            { new: true, runValidators: true }
        );

        console.log(subcategory);

        res.status(201).json({
            success: true,
            message: "Category updated successfully",
            data: subcategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }

}

const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategories.findByIdAndDelete(req.params.subcategory_id);

        if (!subcategory) {
            res.status(404).json({
                success: false,
                message: "Subcategory not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Subcategory deleted successfully",
            data: subcategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const getproduct = async (req, res) => {
    try {
        const getProduct = await Subcategories.aggregate(
            [
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "subcategory_id",
                        as: "Product"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        Product: {
                            $sum: { $size: "$Product" }
                        }
                    }
                }
            ]
        )
        console.log(getProduct);
        res.status(201).json({
            success: true,
            message: "Subcategory Found successfully",
            data: getProduct,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }

}

// const getAvrageProduct = async (req, res) => {
//     try {
//         const Avgproduct = await Subcategories.aggregate(
//             [
//                 {
//                   $lookup: {
//                     from: "products",
//                     localField: "_id",
//                     foreignField: "subcategory_id",
//                     as: "Product"
//                   }
//                 },
//                 {
//                   $group: {
//                     _id: "$_id",
//                     name:{$first:"$name"},
//                     avgProduct: {
//                       $avg:{$size:"$Product"}
//                     }
//                   }
//                 }
//             ]
//         )
//         console.log(Avgproduct);
//         res.status(200).json({
//             success: true,
//             message: "Product Found successfully",
//             data: Avgproduct,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error: " + error.message,
//         });
//     }
// }

const getinactive = async (req, res) => {
    try {
        const inactivesubcategory = await Subcategories.aggregate(
            [
                {
                    $match: {
                        isActive: false
                    }
                }
            ]
        )
        res.status(201).json({
            success: true,
            message: "Subcategory Found successfully",
            data: inactivesubcategory,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

module.exports = {
    listSubcategories,
    getSubcategory,
    getCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getproduct,
    getinactive
}