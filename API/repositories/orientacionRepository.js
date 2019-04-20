const Orientacion = require('../models/orientacion');
const mongoose = require('mongoose');
const showErrors = require('../extras/errors/showErrors');

mongoose.Promise = global.Promise;

getAll = (callback) => {
    Orientacion.find({}, (err, result) => {
        if (err) throw err;
        callback({ data: result, status: 200 });
    });
}

getById = (_id, callback) => {
    Orientacion.findById({ _id }, (err, result) => {
        if (err) throw err;
        if (result) {
            callback({ data: result.toObject(), status: 200 });
        } else {
            callback({ data: null, status: 204 });
        }
    });
}

post = (orientacion, callback) => {
    Orientacion.create(orientacion, (err, result) => {
        if (err) {
            callback({ data: err, status: 500 });
        }
        callback({ data: result, status: 201 });
    });
}

put = (orientacionn, callback) => {
    const { _id, ...orientacion } = orientacionn;
    Orientacion.updateOne({ _id }, orientacion, { new: true }, (err, result) => {
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

deletee = (_id, callback) => {
    Orientacion.deleteOne({ _id }, (err, result) => {
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

module.exports = { getAll, getById, post, put, deletee };