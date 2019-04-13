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
});

module.exports = routes;