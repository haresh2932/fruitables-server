const Categories = require("../model/categories.model");
// const { sendOtp } = require("../utils/twilio");


const listCategories = async (req, res) => {
    //    sendOtp
    try {
        const categories = await Categories.find();
        console.log(categories);
        
        const page =parseInt(req.query.page)
        const pageSize =parseInt(req.query.pageSize)

        if (page <= 0 && pageSize <= 0) {
            return res.status(400).json({
                success: false,
                message: "Page and Pagesize must be greater then 0",
            });
        }

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Categories data not found",
            });
        }

        let startIndex=[],endIndex=[],paginationData=[]
        if(page > 0 && pageSize > 0){
            startIndex=(page-1)*pageSize
            endIndex=page * pageSize
            paginationData=categories.slice(startIndex,endIndex)
        }
        
        return res.status(200).json({
            success: true,
            message: "Categories data fetched",
            totalData:categories.length,
            data: paginationData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message,
        });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.category_id);
        console.log(category);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "category data not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "category data fetched",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message,
        });
    }
};

const addCategory = async (req, res) => {
    try {
        console.log("value", req.body);
        const category = await Categories.create(req.body);
        if (!category) {
          return  res.status(400).json({
                success: true,
                message: "failed to added category",
                data: category,
            });
        }
        return res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: category,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Categories.findByIdAndDelete(req.params.category_id);

        if (!category) {
           return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category,
        });
    } catch (error) {
       return  res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.category_id,
            req.body,
            { new: true, runValidators: true }
        );

        console.log(updatedCategory);

        return res.status(201).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

const countCategory = async (req, res) => {
    try {
        const category = await Categories.aggregate(
            [
                {
                    $match: {
                        isActive: true
                    }
                },
                {
                    $count: 'Active Category'
                }
            ]
        )
        console.log(category);
        return res.status(201).json({
            success: true,
            message: "Category Found successfully",
            data: category,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }

}

const mostProducts = async (req, res) => {
    try {
        const category = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "category_id",
                        as: "Product"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        mostProducts: {
                            $sum: { $size: "$Product" }
                        }
                    }
                },
                {
                    $sort: {
                        mostProducts: -1
                    }
                }
            ]
        )
        console.log(category);
        return res.status(201).json({
            success: true,
            message: "Category Found successfully",
            data: category,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }

}

const TotalProducts = async (req, res) => {
    try {
        const category = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "category_id",
                        as: "Product"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        TotalProduct: {
                            $sum: { $size: "$Product" }
                        }
                    }
                }
            ]
        )
        console.log(category);
        return res.status(201).json({
            success: true,
            message: "Category Found successfully",
            data: category,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }

}

const getSubcategory = async (req, res) => {
    try {
        const subcategory = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: "subcategories",
                        localField: "_id",
                        foreignField: "category_id",
                        as: "Subcategory"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        Subcategories: {
                            $sum: { $size: "$Subcategory" }
                        }
                    }
                }
            ]
        )
        console.log(subcategory);
        return res.status(201).json({
            success: true,
            message: "Subcategory Found successfully",
            data: subcategory,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }

}

const getInactiveCategory = async (req, res) => {
    try {
        const inactivecategory = await Categories.aggregate(
            [
                {
                    $match: {
                        isActive: false
                    }
                }
            ]
        )
        return res.status(201).json({
            success: true,
            message: "Subcategory Found successfully",
            data: inactivecategory,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

module.exports = {
    listCategories,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
    countCategory,
    mostProducts,
    TotalProducts,
    getSubcategory,
    getInactiveCategory
};
