/*
    Administrativos
    ruta: '/api/administrativos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getDocentes, crearDocentes, actializarDocentes, borrarDocentes } = require('../controllers/docentes');
const { validarJWT } = require('../middlewares/valicar-jwt');



const router = Router();

 router.get( '/', getDocentes );

 // Validaciones de campos vacios
 router.post( '/', 
    [
        validarJWT,
        check('idUsuario', 'El ID del docente es necesario').not().isEmpty(),
        check('nombre', 'El nombre del docente es necesario').not().isEmpty(),
        validarCampos
    ],
    crearDocentes 
    );

    router.put( '/:id',
    [],
    actializarDocentes
    );

    router.delete( '/:id',
         borrarDocentes
    );


module.exports = router;