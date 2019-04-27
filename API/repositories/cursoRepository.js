const Curso = require('../models/curso');
const mongoose = require('mongoose');

mongoose.Promises = global.Promise;

getAll = (callback) => {
    Curso.find({}, (err, result) => {
        if(err) throw err;
        callback({data: result, status: 200});
    });
}

getById = (_id, callback) => {
    Curso.findById(_id, (err, result) =>{
        if(err) throw err;
        if(result){
            callback({data: result.toObject(), status: 200});
        }else{
            callback({data: null, status: 204});
        }
    });
}

post = (curso, callback) =>{
    Curso.create(curso, (err, result) => {
        if(err){
            callback({data: err, status:500});
        }
        callback({data: curso, status: 201});
    });
}

put = (cursoo, callback) => {
    const { _id, ...curso} = cursoo;
    Curso.updateOne({_id}, curso, {new: true}, (err,result) => {
        if(err) throw err;
        callback({data: null, status: 204});
    });
}

deletee = (_id, callback) => {
    Curso.deleteOne({_id},(err, result) => {
        if(err) throw err;
        callback({data: null, status:204});
    });
}

module.exports = {getAll, getById, post, put, deletee};