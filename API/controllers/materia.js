const mongoose = require('mongoose');
const express = require('express');
const routes = express.Router();
const materiaRepository = require('../repositories/materia');

routes.group('/materias', (router) => {
    router.get('', (req, res) => {
        materiaRepository.getAll((result) => {
            res.status(result.status).json(result.data);
        });
    });

    router.get(':id', (req, res) => {
        materiaRepository.getById((result) => {
            if (result.status === 204) {
                res.sendStatus(result.status);
                res.end();
            } else {
                res.status(result.status).json(result.data);
            }
        });
    });

    router.post('', (req, res) => {
        materiaRepository.post(materia, (result) => {
            res.status(result.status).json(result.data);
        });
    })
});

module.exports = routes;