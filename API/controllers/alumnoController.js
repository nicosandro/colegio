const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const alumnoRepository = require('../repositories/alumnoRepository');
const personaRepository = require('../repositories/personaRepository');

routes.group('/alumnos', (router) => {
    router.get('', (req, res) => {
        alumnoRepository.getAll((result) => {
            res.status(result.status).json(result.data);
        });
    });

    router.get('/:id', (req, res) => {
        alumnoRepository.getById(req.params.id, (result) => {
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
            let alumnoo = {...req.body };
            let { persona, ...alumno } = alumnoo;

            personaRepository.post(persona, (result) => {
                if (result.status === 201) {
                    /**
                     * SD: (20/4/2019)
                     * Al hacer esta operación de aca abajo el result
                     * sale con muchos atributos mas de los normales y en
                     * _doc estan los datos, pero hay que investigar para
                     * que esto no salga así.
                     */
                    const { _id, ...personaData } = result.data._doc;
                    persona = {};
                    persona._id = _id;
                    alumno.persona = persona;
                    alumnoRepository.post(alumno, (result) => {
                        result.data.persona = personaData;
                        res.status(result.status).json(result.data);
                    });
                } else {
                    res.sendStatus(500);
                }
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

            alumnoRepository.put(alumno, function(result) {
                res.status(result.status);
                res.end();
            });
        }
    });

    router.delete('/:_id', (req, res) => {
        alumnoRepository.deletee(req.params._id, function(result) {
            res.status(result.status);
            res.end();
        })
    })
});

function validations() {
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
        check('anio')
        .isNumeric().withMessage('El año debe tener solo números')
        .isLength({
            min: 1,
            max: 9999
        }).withMessage('El año no puede tener mas de cuatro dígitos')
        /*check('idPersona')
        .isNumeric().withMessage('El id de persona debe tener solo números')
        .isLength({
            min: 1,
            max: 9999
        }).withMessage('El id de persona no puede tener mas de cuatro dígitos'),*/
    ]
}

module.exports = routes;