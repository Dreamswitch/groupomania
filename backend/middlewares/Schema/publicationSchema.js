const Joi = require('joi');

const publicationSchema = Joi.object({

    title: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9à-ïò-öù-üæœÆŒ ,?!.\^\'\"\-]+$'))
        .min(1)
        .max(70)
        .required(),

    body: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9à-ïò-öù-üæœÆŒ ,?!.\^\'\"\-]+$'))
        .max(10000)
        .required()

});

module.exports = publicationSchema;

