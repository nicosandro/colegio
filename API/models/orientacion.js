const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orientacionSchema = new Schema({
    nombre: String
}, { versionKey: false });

module.exports = mongoose.model('Orientacion', orientacionSchema);