const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personaSchema = new Schema({
    nombre: String,
    apellido: String,
    dni: Number,
    fechaNacimiento: Date,
    telefono: Number,
    mail: String,
    direccion: {
        calle: String,
        numero: Number, 
        codigoPostal: Number,
        localidad: String,
    },
    usuario: String,
    contrasenia: String,
}, {versionKey: false});

module.exports = mongoose.model('Persona',personaSchema);