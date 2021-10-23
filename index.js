// llamamos el paquete de express
const express = require('express');
// añadimos la configuracion de la variable de entorno
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

/** Crear Servidor Express */
const app = express();

/** Base de datos */
dbConnection();

/**
 * Utilizar CORS para las peticiones
 */
app.use(cors());

/**Directorio publico */
/** el use es un middleware: funcion que se ejecuta siempre que  alguien hace una peticion a mi servidor*/
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

/**Rutas */
app.use('/api/ciclo3/auth', require('./routes/authRoutes'));
app.use('/api/ciclo3/user', require('./routes/userRoutes'));
app.use('/api/ciclo3/rol', require('./routes/rolRoutes'));



/** Escuchar las peticiones */

app.listen(process.env.Port, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.Port }`)
})