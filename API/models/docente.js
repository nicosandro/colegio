const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docenteSchema = new Schema({
    sueldo: Number,
    esAyudante: Boolean,
    legajo: Number,
    fechaAlta: Date,
    fechaBaja: Date,
    activo: Boolean,
    turno: String,
    persona: { type: Schema.Types.ObjectId, ref: 'Persona' }
}, { versionKey: false });

module.exports = mongoose.model('Docente', docenteSchema);