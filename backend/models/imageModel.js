const { Schema, model, Types } = require('../connection');
const mongoose = require("mongoose")
const myschema = new mongoose.Schema({
    file: String,
    user: { type: mongoose.Types.ObjectId, ref: 'users' },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('images', myschema);