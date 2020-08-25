//requires
require('./config/config');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT;
const path = require('path');

//para recibir los datos del form
app.use(express.urlencoded({ extended: false }));

//para que entienda los json
app.use(express.json());

//pasamos las rutas
app.use(require('./routes/index'));

//hacemos el directorio publico
app.use(express.static(path.resolve(__dirname, '../public')));

//indicamos los partials que utilizara
hbs.registerPartials(path.resolve(__dirname, 'views/partials'));

//habilitamos el engine que utilizaremos
app.set('view engine', 'hbs');

//levantamos el server
app.listen(port, () => {
    console.log('Escuchando peticiones en el puerto ', port);
});