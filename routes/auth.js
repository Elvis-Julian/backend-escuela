/*
       Path: '/api/login' 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/valicar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post( '/', 
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.get( '/renew', 
    validarJWT,
    renewToken
)


module.exports = router;