const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const cursoRepository = require('../repositories/materiaRepository');

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
        .isIn(['1_A', '1_B', '2_A', '2_B', '3_A', '3_B', '4_A', '4_B', '5_A', '5_B', '6_A', '6_B']). withMessage('El anio elegido es incorrecto'),
        check('modalidad')
        .isIn(['PRIMARIO', 'SECUNDARIO']).withMessage('La modalidad tiene que ser "PRIMARIO" o "SECUNDARIO"'),
        check('aula')
        .isNumeric().withMessage('El aula solo debe tener números'),
        check('turno')
        .isIn(['MAÑANA', 'TARDE', 'NOCHE']).withMessage('El turno tiene que ser "Mañana", "Tarde" o "Noche"')
    ]
}

module.exports = routes;