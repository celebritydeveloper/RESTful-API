const Property = new property({
    property_name: {
        type: String,
        min: 3,
        require: true
    },

    property_location: {
        type: String,
        min: 3,
        required: true,
    },

    property_type: {
        type: String,
        min: 3,
        required: true
    }
});