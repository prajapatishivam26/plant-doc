const {Schema,model, Types} = require('../connection');
const mongoose = require("mongoose")

const myschema =  new mongoose.Schema({
    image: {type : mongoose.Types.ObjectId, ref: 'images'},
    user: {type : mongoose.Types.ObjectId, ref: 'users'},
    result: Object,
    createdAt : {
        type:Date,
        default:Date.now()
    }
});

 module.exports = mongoose.model('prediction', myschema);