const { Schema, model, Types } = require('../connection');
const myschema = new Schema({
    title: String,
    type: String,
    image: String,
    description: String,
    price: Number,

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('cure', myschema);