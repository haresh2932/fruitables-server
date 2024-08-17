const express = require('express');
const { categoriesController } = require('../../../controller');
const auth = require('../../../middleware/auth');
const { sendOtp, verifyOtp } = require('../../../utils/twilio');
const validate = require('../../../middleware/validate');
const { categoriesValidation } = require('../../../validation');


const router = express.Router()

router.get(
    "/list-categories",
    // sendOtp ,   
    auth(["admin","employee"]),
    categoriesController.listCategories
)

router.get(
    "/list-categories",
    validate(categoriesValidation.getCategory),
    verifyOtp,
    categoriesController.getCategory
)

router.get(
    "/count-active",
    categoriesController.countCategory  
)

router.get(
    "/most-products",
    categoriesController.mostProducts
)

router.get(
    "/total-products",
    categoriesController.TotalProducts
)

router.get(
    "/count-subcategories",
    categoriesController.getSubcategory    
)

router.get(
    "/inactive",
    categoriesController.getInactiveCategory
)

router.post(
    "/add-category",
    validate(categoriesValidation.createCategory),
    categoriesController.addCategory
)

router.put(
    "/update-category/:category_id",
    validate(categoriesValidation.updateCategory),

    categoriesController.updateCategory
)

router.delete(
    "/delete-category/:category_id",
    validate(categoriesValidation.deleteCategory),
    categoriesController.deleteCategory
)

module.exports=router