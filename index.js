//const express = require('express');
import express from 'express';
import res from 'express/lib/response.js';
import db from './config/db.js';
import router from './routes/index.js';

const app = express();

//conectarse a la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error) );

//definir puerto
const port = process.env.PORT || 4000;

//habilitar PUG
app.set('view engine', 'pug');

//obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.Actualyear = year.getFullYear();
    res.locals.nombresitio = "Agencias de Viajes";
    next();
});

//agrega body parser para leer los datos del formulario
app.use(express.urlencoded( {extended: true} ));

//definir la carpeta publica
app.use(express.static('public'));

//agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El Servidor está funcionando en el puerto ${port}`);
})