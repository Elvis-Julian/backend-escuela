require('dotenv').config();

const express =  require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// configurar cors
app.use(cors());

// lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();
// qZck7sFxuLNdpIkH

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/administrativos', require('./routes/administrativos') );
app.use( '/api/docentes', require('./routes/docentes') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );




app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
})