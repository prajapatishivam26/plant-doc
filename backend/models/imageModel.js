const {Schema,model, Types} = require('../connection');

const myschema = new  Schema({
    file: String,
    user: {type : Types.ObjectId, ref: 'users'},
    createdAt : new Date()
});

 module.exports = model('car', myschema);