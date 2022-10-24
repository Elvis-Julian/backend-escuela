require('dotenv').config();

const express =  require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// configurar cors
app.use(cors());

// Base de datos
dbConnection();
// qZck7sFxuLNdpIkH

// Rutas
app.get( '/', (req, res) => {

    res.json({
        ok:true,
        msg: 'Hola mundo'
    })

} );


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
} )