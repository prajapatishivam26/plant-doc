const {Schema,model} = require('../connection');
const mongoose = require("mongoose")
const myschema = new  mongoose.Schema({
    name: String,
    email : String,
    password : String
});

 module.exports = mongoose.model('users', myschema);