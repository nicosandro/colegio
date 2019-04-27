const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const express = require('express');
const showError = require('../extras/errors/showErrors');
const routes = express.Router();
const alumnoRepository = require('../repositories/alumnoRepository');
const personaRepository = require('../repositories/personaRepository');
const alumno = require('../models/alumno');
const persona = require('../models/persona');


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
            console.log(req.body);
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
                    **/
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
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("here errors");
            console.log(errors.array());
            showError(errors.array(), function(result) {
                res.status(500).json(result);
            });
        } else {

            let alumnoPersona = {};
            alumnoPersona = {...req.body };
            alumnoPersona._id = req.params._id;

            let { persona, ...alumno } = alumnoPersona;
            alumnoRepository.put(alumno, function(result) {
                
                personaRepository.put(persona, function(result){
                res.status(result.status);
                res.end();
                });
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
        .isInt({
            min: 1,
            max: 999999
        }).withMessage('El legajo no puede tener mas de seis dígitos'),
        check('orientacion')
        .isIn(['Mañana', 'Tarde', 'Noche']).withMessage('El turno tiene que ser "Mañana", "Tarde" o "Noche"')
        /*.isIn(['Ciencias Naturales','Ciencias Sociales', 'Economia', 'Otro']).withMessage('Los tipos de orientaciones deben ser "Ciencias Naturales", "Ciencias Sociales", "Economia" u "Otro"'),
        check('anioCursada')
        .isIn(['1_A','1_B', '2_A', '2_B', '3_A', '3_B', '4_A','4_B', '5_A', '5_B', '6_A', '6_B']).withMessage('Los años deben ser "Primero A", "Primero B", "Segundo A", "Segundo B", "Tercero A", "Tercero B", "Cuarto A", "Cuarto B", "Quinto A", "Quinto A", "Sexto A" O "Sexto B"'),
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
        .isNumeric().withMessage('El dni solo debe contener números')
        .isInt({
            min: 11111111,
            max: 99999999
        }),
        check('persona.fechaNacimiento')
        .toDate().withMessage('el formato de la fecha de nacimiento es incorrecto'),
        check('persona.telefono')
        .isNumeric().withMessage('el teléfono solo puede tener números'),
        check('persona.mail')
        .isEmail().withMessage('el formato del mail es incorrecto'),
        check('persona.direccion.calle')
        .isString().withMessage('la calle solo puede tener letras')
        .isLength({
            min: 1,
            max: 50
        }).withMessage('la calle debe tener como máximo 50 caracteres'),
        check('persona.direccion.numero')
        .isNumeric().withMessage('el número solo puede contener dígitos'),
        check('persona.direccion.codigoPostal')
        .isNumeric().withMessage('el código postal debe tener solo dígitos')
        .isInt({
            min: 1000,
            max: 9999
        }),
        check('persona.usuario')
        .isString().withMessage('el usuario solo puede tener letras y números')
        .isLength({
            min: 1,
            max: 50
        }).withMessage('el usuario debe contener al menos 1 caracter'),
        check('persona.contrasenia')
        .isString().withMessage('la contrasenia solo puede tener letras y números')
        .isLength({
            min: 1,
            max: 50
        }).withMessage('la contrasenia debe contener al menos 1 caracter')*/
    ]
}

module.exports = routes;