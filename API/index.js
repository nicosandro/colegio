const express = require('express');
const app = express();
require('express-group-routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const materiaController = require('./controllers/materia');

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://localhost:27017/colegio`, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('short'));
//app.use(morgan('combined'));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(materiaController);

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log("Server is up and listening on ..." + PORT);
});