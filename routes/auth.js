const express = require('express');

const app = express();
const router = require('express').Router();
const users = require('./users');
const Joi = require('joi');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const jwt = require('token-generator');
app.use(express.json());

function validateUser(user) {
    const schema = {
        email: Joi.string().required(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        phone_number: Joi.string().required(),
        address: Joi.string().required(),
        is_admin: Joi.boolean(),
    };

    return Joi.validate(user, schema);
}

const token = uuidv4('5');

router.post('/users', (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = {
        status: 'Success',
        data: {
            id: users.length + token,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            address: req.body.address,
            is_admin: req.body.is_admin,
        },
    };
    //const hash = bcrypt.hashSync(password, salt);
    users.push(user);
    const { data } = user;
    res.send(data);
});

router.get('/users', (req, res) => {
    res.send(users);
});

router.get('/users/:id', (req, res) => {
    const user = users.find(u => u.data.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The requested link wasnt found.');
    res.send(user);
});

router.put('/users/:id', (req, res) => {
    const user = users.find(p => p.data.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The requested property wasnt found.');

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.send(user);
});


router.delete('/users/:id', (req, res) => {
    const user = users.find(p => p.data.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The requested property wasnt found.');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});

module.exports = router;
