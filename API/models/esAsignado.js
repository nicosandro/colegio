const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const esAsignadoSchema = new Schema({
    docente: { type: Schema.Types.ObjectId, ref: 'Docente' },
    materia: { type: Schema.Types.ObjectId, ref: 'Materia' }
}, { versionKey: false });

module.exports = mongoose.model('EsAsignado', esAsignadoSchema,'asignaciones');