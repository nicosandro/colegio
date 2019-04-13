const Materia = require('../models/materia');
const mongoose = require('mongoose');
const showErrors = require('../extras/errors/showErrors');

mongoose.Promise = global.Promise;

getAll = (callback) => {
    Materia.find({}, (err, result) => {
        if (err) throw err;
        callback({ data: result, status: 200 });
    });
}

getById = (_id, callback) => {
    Materia.findById({ _id }, (err, result) => {
        if (err) throw err;
        if (result) {
            callback({ data: result.toObject(), status: 200 });
        } else {
            callback({ data: null, status: 204 });
        }
    });
}

post = (materia, callback) => {
    Materia.create(materia, (err, result) => {
        if (err) {
            callback({ data: err, status: 500 });
        }
        callback({ data: materia, status: 201 });
    });
}

put = (materiaa, callback) => {
    const { _id, ...materia } = materiaa;
    Materia.updateOne({ _id }, materia, { new: true }, (err, result) => {
        console.log("err", result);
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

deletee = (_id, callback) => {
    Materia.deleteOne({ _id }, (err, result) => {
        if (err) throw err;
        callback({ data: null, status: 204 });
    });
}

module.exports = { getAll, getById, post, put, deletee };