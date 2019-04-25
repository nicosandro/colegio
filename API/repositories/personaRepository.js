const Persona = require('../models/persona');
const mongoose = require('mongoose');

mongoose.Promises = global.Promise;

getAll = (callback) => {
    Persona.find({}, (err, result) => {
        if (err) throw err;
        callback({ data: result, status: 200 });
    });
}

getById = (_id, callback) => {
    Persona.findById(_id, (err, result) => {
        if (err) throw err;
        if (result) {
            callback({ data: result.toObject(), status: 200 });
        } else {
            callback({ data: null, status: 204 });
        }
    });
}

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
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

deletee = (_id, callback) => {
    Persona.deleteOne({ _id }, (err, result) => {
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

module.exports = { getAll, getById, post, put, deletee };