const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const materiaRepository = require('../repositories/materia');

routes.group('/materias', (router) => {
    router.get('', (req, res) => {
        materiaRepository.getAll((result) => {
            res.status(result.status).json(result.data);
        });
    });

    router.get('/:id', (req, res) => {
        materiaRepository.getById(req.params.id, (result) => {
            if (result.status === 204) {
                res.sendStatus(result.status);
                res.end();
            } else {
                res.status(result.status).json(result.data);
            }
        });
    });

    router.post('', [
        check('codigo')
        .isNumeric().withMessage('El código debe tener solo números')
        .isLength({
            min: 1,
            max: 9999
        }).withMessage('El código no puede tener mas de cuatro dígitos'),
        check('comision')
        .isNumeric().withMessage('La comisión debe tener solo números')
        .isLength({
            min: 1,
            max: 9999
        }).withMessage('La comisión no puede tener mas de cuatro dígitos'),
        check('nombre')
        .isString().withMessage('El nombre solo debe tener solo letras')
        .isLength({
            min: 1,
            max: 50
        }).withMessage('El nombre no puede tener mas de 50 caracteres'),
        check('turno')
        .isIn(['Mañana', 'Tarde', 'Noche']).withMessage('El turno tiene que ser "Mañana", "Tarde" o "Noche"')
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            showError(errors.array())
                .then(result => {
                    res.status(500).json(result);
                })
        } else {
            const materia = {...req.body };
            materiaRepository.post(materia, function(result) {
                res.status(result.status).json(result.data);
            });
        }
    });

});

module.exports = routes;