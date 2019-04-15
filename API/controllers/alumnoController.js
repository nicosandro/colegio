const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const alumnoRepository = require('../repositories/alumnoRepository');

routes.group('/alumnos', (router) => {
    router.get('', (req, res) => {
        alumnoRepository.getAll((result) => {
            res.status(result.status).json(result.data);
    }); 
});

    router.get('/:id', (req, res) => {
        alumnoRepository.getById(req.params.id, (result) =>{
            if (result.status === 204) {
                res.sendStatus(result.status);
                res.end();
            }else{
                res.status(result.status).json(result.data);
            }
        });
    });

    router.post('', validations(), (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            showError(errors.array())
                .then(result => {
                    res.status(500).json(result);
                })
        }else {
            const alumno = {...req.body};
            alumnoRepository.post(alumno, function(result){
                res.status(result.status).json(result.data);
            });
        }
    });

    router.put('/:_id', validations(),(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            showError(errors.array(), function(result){
                res.status(500).json(result);
            });
        }else {
            let materia = {};
            materia = {...req.body};
            materia._id = req.params._id;

            alumnoRepository.put(alumno, function(result){
                res.status(result.status);
                res.end();
            });
        }
    });

    router.delete('/:_id', (req, res) => {
        alumnoRepository.deletee(req.params._id, function(result){
            res.status(result.status);
            res.end();
        })
    })
});

function validations(){
    return [
        check('legajo')
        .isNumeric().withMessage('El legajo debe tener solo números')
        .isLength({
            min: 1,
            max: 999999
        }).withMessage('El legajo no puede tener mas de seis dígitos'),
        check('orientacion')
        .isString().withMessage('La orientacion solo debe tener solo letras')
        .isLength({
            min: 1,
            max: 50
        }).withMessage('La orientacion no puede tener mas de 50 caracteres'),
        check('año')
        .isNumeric().withMessage('El año debe tener solo números')
        .isLength({
            min: 1,
            max: 9999
        }).withMessage('El año no puede tener mas de cuatro dígitos'),
        check('idPersona')
        .isNumeric().withMessage('El id de persona debe tener solo números')
        .isLength({
            min: 1,
            max: 9999
        }).withMessage('El id de persona no puede tener mas de cuatro dígitos'),
    ]
}

module.exports = routes;
