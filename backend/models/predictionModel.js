const {Schema,model, Types} = require('../connection');

const myschema = new  Schema({
    image: {type : Types.ObjectId, ref: 'images'},
    user: {type : Types.ObjectId, ref: 'users'},
    result: Object,
    createdAt : Date
});

 module.exports = model('prediction', myschema);