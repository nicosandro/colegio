<<<<<<< HEAD:API/repositories/personaRepository.js
const Persona = require('../models/persona');
=======
const EsAsignado = require('../models/esAsignado');
>>>>>>> 4cd6f4c9374230bfe5af69b51fdef9f5c337e33a:API/repositories/esAsignadoRepository.js
const mongoose = require('mongoose');

mongoose.Promises = global.Promise;

getAll = (callback) => {
<<<<<<< HEAD:API/repositories/personaRepository.js
    Persona.find({}, (err, result) => {
=======
    EsAsignado.find({}, (err, result) => {
>>>>>>> 4cd6f4c9374230bfe5af69b51fdef9f5c337e33a:API/repositories/esAsignadoRepository.js
        if (err) throw err;
        callback({ data: result, status: 200 });
    });
}

getById = (_id, callback) => {
<<<<<<< HEAD:API/repositories/personaRepository.js
    Persona.findById(_id, (err, result) => {
=======
    EsAsignado.findById({ _id }, (err, result) => {
>>>>>>> 4cd6f4c9374230bfe5af69b51fdef9f5c337e33a:API/repositories/esAsignadoRepository.js
        if (err) throw err;
        if (result) {
            callback({ data: result.toObject(), status: 200 });
        } else {
            callback({ data: null, status: 204 });
        }
    });
}

<<<<<<< HEAD:API/repositories/personaRepository.js
post = (persona, callback) => {
    Persona.create(persona, (err, result) => {
        if (err) {
            callback({ data: err, status: 500 });
        }
        callback({ data: result, status: 201 });
    });
}

put = (personaa, callback) => {
    const { _id, ...persona } = personaa;
    Persona.updateOne({ _id }, persona, { new: true }, (err, result) => {
        console.log("err", result);
=======
post = (esAsignado, callback) => {
    EsAsignado.create(esAsignado, (err, result) => {
        if (err) {
            callback({ data: err, status: 500 });
        }
        callback({ data: esAsignado, status: 201 });
    });
}

put = (esAsignadoo, callback) => {
    const { _id, ...esAsignado } = esAsignadoo;
    EsAsignado.updateOne({ _id }, esAsignado, { new: true }, (err, result) => {
>>>>>>> 4cd6f4c9374230bfe5af69b51fdef9f5c337e33a:API/repositories/esAsignadoRepository.js
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

deletee = (_id, callback) => {
<<<<<<< HEAD:API/repositories/personaRepository.js
    Persona.deleteOne({ _id }, (err, result) => {
=======
    EsAsignado.deleteOne({ _id }, (err, result) => {
>>>>>>> 4cd6f4c9374230bfe5af69b51fdef9f5c337e33a:API/repositories/esAsignadoRepository.js
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

module.exports = { getAll, getById, post, put, deletee };