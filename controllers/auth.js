const { response } = require('express');
const  bcrypt  = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt');
const { getMenuFronted } = require('../helpers/menu-fronted');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar Email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no valido'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }


        //Generar el TOKEN - JWT
        const token = await generateJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            menu: getMenuFronted( usuarioDB.role )
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const renewToken = async (req, res  = response) => {

    const uid = req.uid;
    //Generar el TOKEN - JWT
    const token = await generateJWT( uid );

    // Obtener el usuario por ID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFronted( usuario.role )
    });
}

module.exports = {
    login,
    renewToken
}