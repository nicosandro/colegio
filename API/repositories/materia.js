const Materia = require('../models/materia');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

getAll = (callback) => {
    Materia.find({}, (err, result) => {
        if (err) throw err;
        callback({ data: result, status: 200 });
    })
}

getById = (_id, callback) => {
    Materia.findById({ _id }, (err, result) => {

    })
}

module.exports = { getAll }