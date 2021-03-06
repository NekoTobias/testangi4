const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pid:{ type: Number, unique: true, required: true },
    type: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    email: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);