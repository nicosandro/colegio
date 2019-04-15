const Alumno = require('../models/alumno');
const mongoose = require('mongoose');
const showErrors = require('../extras/errors/showErrors');

mongoose.Promises = global.Promise;

getAll = (callback) => {
    Alumno.find({}, (err, result) => {
        if(err) throw err;
        callback({data: result, status: 200});
    });
}

getById = (_id, callback) => {
    Alumno.findById(_id, (err, result) =>{
        if(err) throw err;
        if(result){
            callback({data: result.toObject(), status: 200});
        }else{
            callback({data: null, status: 204});
        }
    });
}

post = (alumno, callback) =>{
    Alumno.create(alumno, (err, result) => {
        if(err){
            callback({data: err, status:500});
        }
        callback({data: alumno, status: 201});
    });
}

put = (alumnoo, callback) => {
    const { _id, ...alumno} = alumnoo;
    Alumno.updateOne({_id}, alumno, {new: true}, (err,result) => {
        console.log("err",result);
        if(err) throw err;
        callback({data: null, status: 204});
    });
}

deletee = (_id, callback) => {
    Alumno.deleteOne({_id},(err, result) => {
        if(err) throw err;
        callback({data: null, status:204});
    });
}

module.exports = {getAll, getById, post, put, deletee};