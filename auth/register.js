const Joi = require('joi');
const router = require('express').Router();
const users = require('../config/default');



router.post('/register', (req, res) => {
    // const { error } = validateUser(req.body);

    // if(error) return res.status(400).send(error.details[0].message);

    const user = {
        id: users.length + 1,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        address: req.body.address
    }

    users.push(user);
    res.send(user);
});


function validateUser(user) {
    const schema = {
        email: Joi.string().required(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        password: Joi.string().min(8).required(),
        phone_number: Joi.string().required(),
       address: Joi.string().required()
}

    return Joi.validateUser(user, schema);
}

    
module.exports = router;