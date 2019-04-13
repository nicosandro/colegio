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
        if (err) throw err;
        if (result){
            callback({data: result.toObject(), status: 200});
        }else{
            callback({data: null, status: 204});
        }
    })
}

post = (materia, callback) => {
    Materia.create(materia, (err, result) => {
        if(err) throw err;
        callback({data: materia, status: 201});
    })
}

put = (materia, callback) => {
    const { _id, materia } = materia;
    Materia.updateOne({ _id }, (err, result) => {
        if(err) throw err;
    });
}

module.exports = { getAll }