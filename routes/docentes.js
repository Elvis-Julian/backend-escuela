/*
    Administrativos
    ruta: '/api/administrativos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getDocentes, crearDocentes, actualizarDocentes, borrarDocentes } = require('../controllers/docentes');
const { validarJWT } = require('../middlewares/valicar-jwt');



const router = Router();

 router.get( '/', getDocentes );

 // Validaciones de campos vacios
 router.post( '/', 
    [
        validarJWT,
        check('idUsuario', 'El ID del docente es necesario').not().isEmpty(),
        check('nombre', 'El nombre del docente es necesario').not().isEmpty(),
        check('fecha', 'La fecha es necesaria').not().isEmpty(),
        check('hora_ent', 'La hora de entrada es requerida').not().isEmpty(),
        check('hora_sld', 'La hora de salida es requerida').not().isEmpty(),
        validarCampos
    ],
    crearDocentes 
    );

    router.put( '/:id',
    [
        validarJWT,
        check('idUsuario', 'El ID del docente es necesario').not().isEmpty(),
        check('nombre', 'El nombre del docente es necesario').not().isEmpty(),
        check('fecha', 'La fecha es necesaria').not().isEmpty(),
        check('hora_ent', 'La hora de entrada es requerida').not().isEmpty(),
        check('hora_sld', 'La hora de salida es requerida').not().isEmpty(),
        validarCampos 
    ],
    actualizarDocentes
    );

    router.delete( '/:id',
    validarJWT,     
    borrarDocentes
    );


module.exports = router;