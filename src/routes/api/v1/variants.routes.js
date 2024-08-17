const express = require('express');
const { variantsController } = require('../../../controller');
const upload = require('../../../middleware/upload');
const router = express.Router()

router.get(
    "/list-variants",
    variantsController.listVariants
)

router.get(
    "/list-variants/:variant_id",
    variantsController.getVariant
)

router.post(
    "/add-variants",
    upload.array('variant_img',10),
    variantsController.addVariant
)

router.put(
    "/update-variant/:variant_id",
    upload.array('variant_img',10),
    variantsController.updateVariant
)

router.delete(
    "/delete-variant/:variant_id",
    variantsController.deleteVariant
)

module.exports=router