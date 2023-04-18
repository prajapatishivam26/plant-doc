const { stringify } = require('nodemon/lib/utils');
const {Schema,model} = require('../connection');

const myschema = new  Schema({
    name: String,
    brand: String,
    price : String
});

 module.exports = model('car', myschema);