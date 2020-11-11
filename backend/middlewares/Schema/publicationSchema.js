const Joi = require('joi');

const publicationSchema = Joi.object({

    title: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9 &.\'\"?-]+$'))
        .min(1)
        .max(70)
        .required(),

    body: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9 ,\'\"?.-]+$'))
        .min(10)
        .max(1000)
        .required()

});

module.exports = publicationSchema;

