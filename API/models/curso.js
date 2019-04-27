const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    modalidad: String,
    anioCursada: Number,
    aula: { type: Schema.Types.ObjectId, ref: 'Aula' },
    turno: String
}, { versionKey: false });

module.exports = mongoose.model('Curso', cursoSchema);