const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const cursoRepository = require('../repositories/materiaRepository');
const { getModalidad, getAniosCursada } = require('../extras/enums/enums');

routes.group('/cursos', (router) => {
    router.get('', (req, res) => {
        cursoRepository.getAll((result) => {
            res.status(result.status).json(result.data);
        });
    });

    
    router.get('/:id', (req, res) => {
        cursoRepository.getById(req.params.id, (result) => {
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
            const materia = {...req.body };
            cursoRepository.post(materia, function(result) {
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
            let materia = {};
            materia = {...req.body };
            materia._id = req.params._id;

            cursoRepository.put(materia, function(result) {
                res.status(result.status);
                res.end();
            });
        }
    });

    router.delete('/:_id', (req, res) => {
        cursoRepository.deletee(req.params._id, function(result) {
            res.status(result.status);
            res.end();
        })
    })

});

function validations() {
    return [
        check('anioCursada')
        .isIn(`getAniosCursada()`). withMessage('El anio de cursada tiene que ser'+getAniosCursada()),
        check('modalidad')
        .isIn(`getModalidad()`).withMessage('La modalidad tiene que ser'+getModalidad()),
        check('aula')
        .isNumeric().withMessage('El aula solo debe tener números'),
        check('turno')
        .isIn(`getTurnos()`).withMessage('El turno tiene que ser'+getTurnos())
    ]
}

module.exports = routes;