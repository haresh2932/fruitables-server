const express = require('express');
const { subcategoriesController } = require('../../../controller');
const router = express.Router()

router.get(
    "/list-subcategories",
    subcategoriesController.listSubcategories    
)

router.get(
    "/list-subcategories/:subcategory_id",
    subcategoriesController.getSubcategory    
)

router.get(
    "/list-categories/:category_id",
    subcategoriesController.getCategory       
)

router.get(
    "/count-products",
    subcategoriesController.getproduct    
)
router.post(
    "/add-subcategory",
    subcategoriesController.addSubcategory
)

router.put(
    "/update-subcategory/:subcategory_id",
    subcategoriesController.updateSubcategory
)

router.delete(
    "/delete-subcategory/:subcategory_id",
    subcategoriesController.deleteSubcategory
)



router.get(
    "/inactive",
    subcategoriesController.getinactive   
)

module.exports=router