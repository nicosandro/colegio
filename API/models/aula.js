const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aulaSchema = new Schema({
    numero: Number,
    capacidad: String
}, {versionKey: false});

module.exports = mongoose.model('Aula',aulaSchema);