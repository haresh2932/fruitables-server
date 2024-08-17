const express = require('express');
const { productsController } = require('../../../controller');
const upload = require('../../../middleware/upload');
const router = express.Router()

router.get(
    "/list-products",
    productsController.listProducts
    
)

router.get(
    "/list-products/:product_id",
    productsController.getProduct
    
)

router.post(
    "/add-product",
    upload.single('product_img'),
    productsController.addProduct
)

router.put(
    "/update-product/:product_id",
    upload.single('product_img'),
    productsController.updateProduct
)

router.delete(
    "/delete-product/:product_id",
    productsController.deleteProduct
)

router.get(
    "/count-categories",
    productsController.getCategoryasync    
),

router.get(
    "/search",
    productsController.searchProduct    
),


module.exports=router