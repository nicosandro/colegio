const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnoSchema = new Schema({
    legajo: Number,
    orientacion: String,
    anioCursada: String,
    persona: { type: Schema.Types.ObjectId, ref: 'Persona' }
}, { versionKey: false });

module.exports = mongoose.model('Alumno', alumnoSchema);