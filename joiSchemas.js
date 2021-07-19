const Joi = require('joi'); 

module.exports.postSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().required().min(3).max(120),
        description: Joi.string().required().min(120).max(2000),
        //image: Joi.string().required(),
    }).required(),
    deleteImages: Joi.array()
})


module.exports.consultSchema = Joi.object({
    consult: Joi.object({
        body: Joi.string(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
});