/*
        ruta: api/todo/:busqueda
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/valicar-jwt');
const { getTodo, getDocumentos } = require('../controllers/busquedas');

const router = Router();


router.get('/:busqueda', validarJWT,getTodo );

router.get('/coleccion/:tabla/:busqueda', validarJWT,getDocumentos );


module.exports = router;