const Joi = require('joi');

// const schema = {
//     email: Joi.string().required().email(),
//     first_name: Joi.string().min(3).required(),
//     last_name: Joi.string().min(3).required(),
//     phone_number: Joi.string().required(),
//     address: Joi.string().required()
// }


function validateProperty(user) {
         const schema = {
             email: Joi.string().required(),
             first_name: Joi.string().min(3).required(),
             last_name: Joi.string().min(3).required(),
             password: Joi.string().min(8).required(),
             phone_number: Joi.string().required(),
            address: Joi.string().required()
     }
    
         return Joi.validateProperty(user, schema);
}
    