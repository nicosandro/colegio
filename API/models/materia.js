const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materiaSchema = new Schema({
    codigo: Number,
    comision: Number,
    nombre: String,
    turno: String
}, { versionKey: false });

module.exports = mongoose.model('Materia', materiaSchema);