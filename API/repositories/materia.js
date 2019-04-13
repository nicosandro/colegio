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
        let errors;
        console.log("errrs", err);
        if (err) {
            errors = showErrors(err.errors);
        }
        if (errors.length > 0) {
            callback({ data: errors, status: 204 });
        }
        callback({ data: materia, status: 201 });
    });
}

put = (materiaa, callback) => {
    const { _id, materia } = materiaa.toObject();
    Materia.updateOne({ _id }, (err, result) => {
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