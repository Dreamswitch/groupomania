const Joi = require('joi');

const profileSchema = Joi.object({

    description: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9 ,\'\"?.-]+$'))
        .max(1000),
    /* 
        id_publication: Joi.number()
            .min(1),
    
        actor_publication: Joi.number()
            .min(1) */

});

module.exports = profileSchema;