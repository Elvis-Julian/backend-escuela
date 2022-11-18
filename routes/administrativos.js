/*
    Administrativos
    ruta: '/api/administrativos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getAdministrativos, crearAdministrativos, actualizarAdministrativos, borrarAdministrativos } = require('../controllers/administrativos');
const { validarJWT } = require('../middlewares/valicar-jwt');



const router = Router();

 router.get( '/', getAdministrativos );

 // Validaciones de campos vacios
 router.post( '/', 
    [
        validarJWT,
        check('idUsuario', 'El ID del administrativo es necesario').not().isEmpty(),
        check('nombre', 'El nombre del administrativo es necesario').not().isEmpty(),
        check('fecha', 'La fecha es necesaria').not().isEmpty(),
        check('hora_ent', 'La hora de entrada es necesaria').not().isEmpty(),
        check('hora_sld', 'La hora de salida es necesaria').not().isEmpty(),
        validarCampos
    ],
    crearAdministrativos 
    );

    router.put( '/:id',
    [
        validarJWT,
        check('idUsuario', 'El ID del administrativo es necesario').not().isEmpty(),
        check('nombre', 'El nombre del administrativo es necesario').not().isEmpty(),
        check('fecha', 'La fecha es necesaria').not().isEmpty(),
        check('hora_ent', 'La hora de entrada es necesaria').not().isEmpty(),
        check('hora_sld', 'La hora de salida es necesaria').not().isEmpty(),
        validarCampos
    ],
    actualizarAdministrativos
    );

    router.delete( '/:id',
         validarJWT,
         borrarAdministrativos
    );


module.exports = router;