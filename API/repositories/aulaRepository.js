const Aula = require('../models/aula');
const mongoose = require('mongoose');

mongoose.Promises = global.Promise;

getAll = (callback) => {
    Aula.find({}, (err, result) => {
        if(err) throw err;
        callback({data: result, status: 200});
    });
}

getById = (_id, callback) => {
    Aula.findById(_id, (err, result) =>{
        if(err) throw err;
        if(result){
            callback({data: result.toObject(), status: 200});
        }else{
            callback({data: null, status: 204});
        }
    });
}

post = (aula, callback) =>{
    Aula.create(aula, (err, result) => {
        if(err){
            callback({data: err, status:500});
        }
        callback({data: aula, status: 201});
    });
}

put = (aulaa, callback) => {
    const { _id, ...aula} = aulaa;
    Aula.updateOne({_id}, aula, {new: true}, (err,result) => {
        if(err) throw err;
        callback({data: null, status: 204});
    });
}

deletee = (_id, callback) => {
    Aula.deleteOne({_id},(err, result) => {
        if(err) throw err;
        callback({data: null, status:204});
    });
}

module.exports = {getAll, getById, post, put, deletee};