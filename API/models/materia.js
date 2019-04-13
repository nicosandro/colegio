const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materiaSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
        max: 4,
    },
    comision: {
        type: Number,
        required: true,
        unique: true,
        max: 4
    },
    nombre: {
        type: String,
        required: [true, 'Debe ingresar un nombre'],
        maxlength: 50
    },
    turno: {
        type: String,
        enum: ['Mañana', 'Tarde', 'Noche'],
        required: [true, 'Debe ingresar un turno']
    },
    docentes: {
        type: [Number],
        required: false
    }
}, { versionKey: false });

module.exports = mongoose.model('Materia', materiaSchema);