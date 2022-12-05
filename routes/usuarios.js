const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, crearUsuario, actializarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');
const { validarJWT, validarADMIN_ROLE, validarMismoUsuario } = require('../middlewares/valicar-jwt');



const router = Router();

 router.get( '/', validarJWT, getUsuarios );

 // Validaciones de campos vacios
 router.post( '/', 
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('email', 'El correo es requerido').isEmail(),
        validarCampos,
    ],
    crearUsuario 
    );

    router.put( '/:id',
    [
        validarJWT,
        validarMismoUsuario,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El correo es requerido').isEmail(),
        validarCampos,
    ],
    actializarUsuario 
    );

    router.delete( '/:id',
         [ validarJWT, validarADMIN_ROLE ],
         borrarUsuario 
    );


module.exports = router;