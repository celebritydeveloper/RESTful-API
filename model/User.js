const Joi = require('joi');

const userSchema = ({
    email: {
        type: String,
        required: true,
    },

    first_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },

    last_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 8,
        max: 255
    },

    phone_number: {
        type: String,
        required: true,
        min: 11,
        max: 255
    },

    address: {
        type: String,
        min: 6,
        max: 255
    }

});

module.exports = Schema('User', userSchema);