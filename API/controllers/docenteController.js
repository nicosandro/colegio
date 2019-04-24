const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const docenteRepository = require('../repositories/docenteRepository');
const personaRepository = require('../repositories/personaRepository');
const Docente = require('../models/docente');
const moment = require('moment');

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
            const body = {...req.body };
            let { persona, ...docente } = body;
            personaRepository.post(persona, function(result) {
                const { _id, ...personaPost } = result.data;
                persona = {};
                persona._id = _id;
                docente.persona = persona;
                docente.fechaAlta = moment().format("YYYY-MM-DD");
                console.log("doc", docente);
                docenteRepository.post(docente, function(result) {
                    res.status(result.status).json(result.data);
                });
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
        check('esAyudante')
        .isBoolean().withMessage('esAyudante solo puede ser "true" o "false"'),
        check('legajo')
        .custom(legajo => {
            return Docente.findOne({ legajo }).then(docente => {
                if (docente) {
                    return Promise.reject("El legajo ya se encuentra en uso");
                }
            })
        })
        .isNumeric().withMessage('El legajo debe solo tener números')
        .isInt({
            min: 1,
            max: 9999
        }).withMessage('El legajo solo puede tenr cuatro dígitos'),
        check('fechaAlta')
        .toDate().withMessage('La fecha de alta tiene formato incorrecto'),
        check('fechaBaja')
        .toDate().withMessage('La fecha de alta tiene formato incorrecto'),
        check('activo')
        .isBoolean().withMessage('el estado puede ser solamente true o false'),
        check('turno')
        .isIn(['Mañana', 'Tarde', 'Noche']).withMessage('El turno tiene que ser "Mañana", "Tarde" o "Noche"'),
        check('persona.nombre')
        .isString('el nombre no puede tener caracteres especiales')
        .isLength({
            min: 1,
            max: 50
        }).withMessage('el nombre debe tener entre 1 y 50 caracteres'),
        check('persona.apellido')
        .isString('el apellido no puede tener caracteres especiales')
        .isLength({
            min: 1,
            max: 50
        }).withMessage('el apellido debe tener entre 1 y 50 caracteres'),
        check('persona.dni')
        .isNumeric().withMessage('El dni solo debe contener números'),
        check('persona.fechaNacimiento')
        .toDate().withMessage('el formato de la fecha de nacimiento es incorrecto'),
        check('persona.telefono')
        .isNumeric().withMessage('el teléfono solo puede tener números'),
        check('persona.mail')
        .isEmail().withMessage('el formato del mail es incorrecto'),
        check('persona.direccion.calle')
        .isString().withMessage('la calle solo puede tener números y/o letras')
        .isLength({
            max: 50
        }).withMessage('la calle debe tener como máximo 50 caracteres'),
        check('persona.direccion.numero')
        .isNumeric().withMessage('el número solo puede contener dígitos'),
        check('persona.direccion.codigoPostal')
        .isNumeric().withMessage('el código postal solo debe tener dígitos')
        .isInt({
            max: 999999
        }),
        check('persona.usuario')
        .isString().withMessage('el usuario solo puede tener letras y números')
        .isLength({
            min: 1
        }).withMessage('el usuario debe contener al menos 1 caracter'),
        check('persona.contrasenia')
        .isString().withMessage('la contrasenia solo puede tener letras y números')
        .isLength({
            min: 1
        }).withMessage('la contrasenia debe contener al menos 1 caracter')
    ]
}

module.exports = routes;