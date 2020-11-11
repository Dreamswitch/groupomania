const Joi = require('joi');

const commentSchema = Joi.object({

    body: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9 ,\'\"?.-]+$'))
        .min(1)
        .max(1000)
        .required(),
/* 
    id_publication: Joi.number()
        .min(1),

    actor_publication: Joi.number()
        .min(1) */

});

module.exports = commentSchema;

