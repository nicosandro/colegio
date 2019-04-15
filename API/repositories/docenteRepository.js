const Docente = require('../models/docente');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

getAll = (callback) => {
    Docente.find({}, (err, result) => {
        if (err) throw err;
        callback({ data: result, status: 200 });
    });
}

getById = (_id, callback) => {
    Docente.findById({ _id }, (err, result) => {
        if (err) throw err;
        if (result) {
            callback({ data: result.toObject(), status: 200 });
        } else {
            callback({ data: null, status: 204 });
        }
    });
}

post = (docente, callback) => {
    Docente.create(docente, (err, result) => {
        if (err) {
            callback({ data: err, status: 500 });
        }
        callback({ data: docente, status: 201 });
    });
}

put = (docentee, callback) => {
    const { _id, ...docente } = docentee;
    Docente.updateOne({ _id }, docente, { new: true }, (err, result) => {
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

deletee = (_id, callback) => {
    Docente.deleteOne({ _id }, (err, result) => {
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

module.exports = { getAll, getById, post, put, deletee };