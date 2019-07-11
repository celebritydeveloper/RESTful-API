const Joi = require('joi');
const express = require('express');

const app = express();
const users = require('./routes/users');
const properties = require('./routes/property');
const flags = require('./routes/flags');
const authRoute = require('./routes/auth');


// Json Parse middleware
app.use(express.json());

app.use('/api/v1', authRoute);

function validateUser(user) {
    const schema = {
        email: Joi.string().required(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        password: Joi.string().min(8).required(),
        phone_number: Joi.string().required(),
        address: Joi.string().required(),
        is_admin: Joi.boolean(),
    };

    return Joi.validate(user, schema);
}


function validateProperty(property) {
    const schema = {
        owner: Joi.string(),
        status: Joi.string().min(3).required(),
        price: Joi.string().min(3).required(),
        state: Joi.string().min(8).required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        type: Joi.string(),
        image_url: Joi.string(),
    };

    return Joi.validate(property, schema);
}


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/v1/properties', (req, res) => {
    res.send(properties);
});

app.get('/api/v1/flags', (req, res) => {
    res.send(flags);
});

// app.post('/api/v1/users', (req, res) => {
//     const { error } = validateUser(req.body);

//     //const failed = res.status(400).send(error.details[0].message);
//     //const success = res.status(200).send('Your Account was successfully created');
//     if(error) return res.status(400).send(error.details[0].message);
//     const user = {
//         status: "Success",
//         data: {
//             id: users.length + 1,
//             email: req.body.email,
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             password: req.body.password,
//             address: req.body.address,
//             is_admin: req.body.is_admin
//         } 
//     };  
//     //const data = user.data;
//     users.push(user);
//     res.send(user);
// });

app.post('/api/v1/property', (req, res) => {
    const { error } = validateProperty(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const property = {
        status: 'Success',
        data: {
            id: properties.length + 1,
            owner: req.body.owner,
            status: req.body.status,
            price: req.body.price,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            type: req.body.type,
            image_url: req.body.image_url,
        },
    };

    users.push(property);
    res.send(property);
});


app.post('/api/v1/flags', (req, res) => {
    const { error } = validateProperty(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const flag = {
        status: 'Success',
        data: {
            id: flags.length + 1,
            property_id: req.body.property_id,
            reason: req.body.reason,
            description: req.body.description,
        },
    };

    flags.push(flag);
    res.send(flag);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));


module.exports = validateUser;
