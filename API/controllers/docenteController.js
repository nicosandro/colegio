const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const docenteRepository = require('../repositories/docenteRepository');
const Materia = require('../models/materia');

routes.group('/docentes', (router) => {
    router.get('', (req, res) => {
        docenteRepository.getAll((result) => {
            res.status(result.status).json(result.data);
        });
    });

    router.get('/:id', (req, res) => {
        docenteRepository.getById(req.params.id, (result) => {
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
                });
        } else {
            const docente = {...req.body };
            docenteRepository.post(docente, function(result) {
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
            let docente = {...req.body };
            docente._id = req.params._id;

            docenteRepository.put(docente, function(result) {
                res.status(result.status);
                res.end();
            });
        }
    });

    router.delete('/:_id', (req, res) => {
        docenteRepository.deletee(req.params._id, function(result) {
            res.status(result.status);
            res.end();
        });
    });
});

function validations() {
    return [
        check('sueldo')
        .isNumeric().withMessage('El sueldo debe tener solo números'),
        check('materias')
        .custom(value => {
            return value.map(id => {
                const { _id } = id;
                Materia.findById({ _id }, (err, result) => {
                    if (!result) {
                        return Promise.reject("Materia incorrecta");
                    }
                })
			});
        }),
        check('esAyudante')
        .isBoolean().withMessage('esAyudante solo puede ser "true" o "false"'),
        check('legajo')
        .isNumeric().withMessage('El legajo debe solo tener números')
        .isInt({
            min: 1,
            max: 9999
        }).withMessage('El legajo solo puede tenr cuatro dígitos'),
        check('fechaAlta')
        .toDate().withMessage('La fecha de alta tiene formato incorrecto'),
        check('fechaBaja')
        .toDate().withMessage('La fecha de alta tiene formato incorrecto'),
        check('turno')
        .isIn(['Mañana', 'Tarde', 'Noche']).withMessage('El turno tiene que ser "Mañana", "Tarde" o "Noche"')
    ]
}

module.exports = routes;