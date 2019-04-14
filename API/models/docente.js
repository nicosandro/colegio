const mongoose = require('mongoose');
const Materia = require('./materia');
const Schema = mongoose.Schema;

const docenteSchema = new Schema({
    sueldo: Number,
    materias: [Materia],
    esAyudante: Boolean,
    legajo: Number,
    fechaAlta: Date,
    fechaBaja: Date,
    turno: Number
}, { versionKey: false });

module.exports = mongoose.model('Docente', docenteSchema);