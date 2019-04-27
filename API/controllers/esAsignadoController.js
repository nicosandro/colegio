const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const esAsignadoRepository = require('../repositories/esAsignadoRepository');
const docente = require('../models/docente');
const materia = require('../models/materia');

routes.group('/asignaciones', (router) => {
    router.get('', (req, res) => {
        esAsignadoRepository.getAll((result) => {
            res.status(result.status).json(result.data);
        });
    });


    router.get('/:id', (req, res) => {
        esAsignadoRepository.getById(req.params.id, (result) => {
            if (result.status === 204) {
                res.sendStatus(result.status);
                res.end();
            } else {
                res.status(result.status).json(result.data);
            }
        });
    });

    router.post('', validations(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            showError(errors.array())
                .then(result => {
                    res.status(500).json(result);
                })
        } else {
            const esAsignado = {...req.body };
            esAsignadoRepository.post(esAsignado, function(result) {
                res.status(result.status).json(result.data);
            });
        }
    });

    router.put('/:_id', validations(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            showError(errors.array(), function(result) {
                res.status(500).json(result);
            });
        } else {
            let esAsignado = {};
            esAsignado = {...req.body };
            esAsignado._id = req.params._id;

            esAsignadoRepository.put(esAsignado, function(result) {
                res.status(result.status);
                res.end();
            });
        }
    });

    router.delete('/:_id', (req, res) => {
        esAsignadoRepository.deletee(req.params._id, function(result) {
            res.status(result.status);
            res.end();
        })
    })

});

function validations() {
    return [
        check('docente')
        .custom(_id => {
            return docente.findOne({_id}).then(docente =>{
                if(!docente){
                    return Promise.reject(`No existe el docente con el id ${_id}`);
                }
            })
        }),
        check('materia')
        .custom(_id => {
            return materia.findOne({_id}).then(materia =>{
                if(!materia){
                    return Promise.reject(`No existe la materia con el id ${_id}`);
                }
            })
        })
    ]
}

module.exports = routes;