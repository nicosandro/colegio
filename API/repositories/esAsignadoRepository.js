const EsAsignado = require('../models/esAsignado');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

getAll = (callback) => {
    EsAsignado.find({}, (err, result) => {
        if (err) throw err;
        callback({ data: result, status: 200 });
    });
}

getById = (_id, callback) => {
    EsAsignado.findById({ _id }, (err, result) => {
        if (err) throw err;
        if (result) {
            callback({ data: result.toObject(), status: 200 });
        } else {
            callback({ data: null, status: 204 });
        }
    });
}

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
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

deletee = (_id, callback) => {
    EsAsignado.deleteOne({ _id }, (err, result) => {
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

module.exports = { getAll, getById, post, put, deletee };