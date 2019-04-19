const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const orientacionRepository = require('../repositories/orientacionRepository');

routes.group('/orientaciones', (router) => {
    router.get('', (req, res) => {
        orientacionRepository.getAll((result) => {
            res.status(result.status).json(result.data);
        });
    });


    router.get('/:id', (req, res) => {
        orientacionRepository.getById(req.params.id, (result) => {
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
            const orientacion = {...req.body };
            orientacionRepository.post(orientacion, function(result) {
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
            let orientacion = {};
            orientacion = {...req.body };
            orientacion._id = req.params._id;

            orientacionRepository.put(orientacion, function(result) {
                res.status(result.status);
                res.end();
            });
        }
    });

    router.delete('/:_id', (req, res) => {
        orientacionRepository.deletee(req.params._id, function(result) {
            res.status(result.status);
            res.end();
        })
    })

});

function validations() {
    return [
        check('nombre')
        .isString().withMessage('El nombre solo debe tener solo letras')
        .isLength({
            min: 1,
            max: 50
        }).withMessage('El nombre no puede tener mas de 50 caracteres')
    ]
}

module.exports = routes;