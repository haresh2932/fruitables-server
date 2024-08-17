const Joi = require("joi");


const createCategory={
    body:Joi.object().keys({
        name:Joi.string().required().max(30).trim().uppercase(),
        description:Joi.string().required().max(100),
    })
}

const updateCategory={
    body:Joi.object().keys({
        name:Joi.string().required().max(30).trim().uppercase(),
        description:Joi.string().required().max(100),
    }),

    params:Joi.object().keys({
        category_id:Joi.string().required()
    })
}

const deleteCategory={
    params:Joi.object().keys({
        category_id:Joi.string().required()
    })
}

const getCategory={
    query:Joi.object().keys({
        category_id:Joi.string().required()
    })
}

module.exports={
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory
}