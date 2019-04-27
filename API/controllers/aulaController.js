const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const aulaRepository = require('../repositories/aulaRepository');

routes.group('/aulas', (router) => {
    router.get('', (req, res) => {
        aulaRepository.getAll((result) => {
            res.status(result.status).json(result.data);
        });
    });


    router.get('/:id', (req, res) => {
        aulaRepository.getById(req.params.id, (result) => {
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
            const aula = {...req.body };
            aulaRepository.post(aula, function(result) {
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
            let aula = {};
            aula = {...req.body };
            aula._id = req.params._id;

            aulaRepository.put(aula, function(result) {
                res.status(result.status);
                res.end();
            });
        }
    });

    router.delete('/:_id', (req, res) => {
        aulaRepository.deletee(req.params._id, function(result) {
            res.status(result.status);
            res.end();
        })
    })

});

function validations() {
    return [
        check('numero')
        .isNumeric().withMessage('El número solo puede tener dígitos')
        .isLength({
            min: 1
        }).withMessage('El número es un campo obligatorio'),
        check('capacidad')
        .isNumeric().withMessage('La capacidad solo puede tener números')
        .isLength({
            min: 1
        }).withMessage('La capacidad es un campo obligatorio')
    ]
}

module.exports = routes;