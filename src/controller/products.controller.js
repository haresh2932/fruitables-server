const Products = require("../model/products.model");
const uploadFile = require("../utils/cloudinary");

const listProducts = async (req, res) => {
    try {
        const products = await Products.find()
        console.log(products);


        if (!products || products.length === 0) {
            res.status(404).json({
                success: false,
                message: "Products data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Products data fetched",
            data: products,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const products = await Products.findById(req.params.product_id)
        if (!products) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Data fetched",
            data: products
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}
const addProduct = async (req, res) => {
    console.log("hahhaa", req.body);
    // console.log(req.file);
    try {
        const productRes = await uploadFile(req.file.path, "Product")
        // console.log(productRes);
        const d = {
            ...req.body,
            product_img: {
                public_id: productRes.public_id,
                url: productRes.url
            }
        }
        const product = await Products.create({
            ...req.body,
            product_img: {
                public_id: productRes.public_id,
                url: productRes.url
            }
        });
        if (!product) {
            res.status(400).json({
                success: true,
                message: "failed to added product",
                data: product,
            });
        }
        res.status(201).json({
            success: true,
            message: "product added successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const updateProduct = async (req, res) => {
    console.log("jdghdgh", req.file, req.body);
    try {
        if (req.file) {
            console.log("New File upload");
            const proRes = await uploadFile(req.file.path, "Product");
            console.log(proRes);

            const updateProducts = await Products.findByIdAndUpdate(
                req.params.product_id,
                {
                    ...req.body,
                    product_img: {
                        public_id: proRes.public_id,
                        url: proRes.url,
                    },
                },
                { new: true, runValidators: true }
            )

            if (!updateProducts) {
                res.status(400).json({
                    success: false,
                    message: "Bad request",
                });
            }

            res.status(200).json({
                success: true,
                message: "Category updated successfully",
                data: updateProducts,
            });


        } else {
            const product = await Products.findByIdAndUpdate(
                req.params.product_id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!product) {
                res.status(400).json({
                    success: false,
                    message: "Bad request",
                });

            };
            res.status(201).json({
                success: true,
                message: "Product updated successfully",
                data: product,
            });


        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.product_id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "product deleted successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const getCategoryasync = async (req, res) => {
    try {
        const getProduct = await Products.aggregate(
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
                        countProduct: {
                            $sum: 1
                        }
                    }
                }
            ]
        )
        console.log(getProduct);
        res.status(201).json({
            success: true,
            message: "category Found successfully",
            data: getProduct,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}
const searchProduct = async (req, res) => {
    try {

        const { sortOrder, rating, max, min, category, page, limit } = req.body
        const mergePipe = {}

        if (category) {
            mergePipe["category_id"] = category
        }

        if (rating) {
            mergePipe["avgRating"] = { $gte: rating }
        }

        if (min != undefined || max != undefined) {
            mergePipe["Variant.attributes.Price"] = {}
        }

        if (min != undefined) {
            mergePipe["Variant.attributes.Price"].$gte = min
        }

        if (max != undefined) {
            mergePipe["Variant.attributes.Price"].$lte = max
        }

        const pipeline = [
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "Variant"
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    avgRating: { $avg: "$reviews.rating" }
                }
            },
            {
                $unwind: "$Variant"
            },
            {
                $match: mergePipe
            },
            {
                $group: {
                    _id: "$_id",
                    name: {
                        $first: "$name"
                    },
                    variants: { $push: "$Variant" },
                    reviews: { $push: "$reviews" }
                }
            },
            {
                $sort: {
                    name: sortOrder === 'asc' ? 1 : -1
                }
            }
        ]

        if (page >= 1 && limit >= 1) {
            pipeline.push({$skip: (page-1)*limit})
            pipeline.push({$limit:limit})
        }

        const product = await Products.aggregate(pipeline)
        console.log(product);

        res.status(200).json({
            success: true,
            message: "Product Fetch successfully",
            data: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}


module.exports = {
    listProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getCategoryasync,
    searchProduct
}