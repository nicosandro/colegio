const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnoSchema = new Schema({
    legajo: Number,
    orientacion: String,
    año: Number,
    idPersona: Number
}, {versionKey: false});

module.exports = mongoose.model('Alumno',alumnoSchema);