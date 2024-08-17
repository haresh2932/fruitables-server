const express = require('express')
const { salsepeopleController } = require('../../../controller')


const router= express.Router()

router.get(
    "/get-salespeople",
    salsepeopleController.getSalesPeople
)

router.post(
    "/add-salespeople",
    salsepeopleController.addSalespeople
)

router.get(
    "/get-salespeople/:snum",
    salsepeopleController.getSalespeopleData
)

router.put(
    "/update-salespeople/:snum",
    salsepeopleController.updateSalespeople
)

router.delete(
    "/delete-salespeople/:snum",
    salsepeopleController.deleteSalespeopleData
)
module.exports= router