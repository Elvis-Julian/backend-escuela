const { response } = require('express');
// const  bcrypt  = require('bcryptjs');

const Docente = require('../models/docentes');
// const { generateJWT } = require('../helpers/jwt');


const getDocentes = async (req, res = response) => {
    const docentes = await Docente.find()
                                    .populate('usuario', 'nombre')
    // Se define que se obtiene en la consulta
    res.json({
        ok: true,
        docentes
    });

}

const crearDocentes = async (req, res = response) => {
    const uid = req.uid;
    const{idUsuario} = req.body;
    const docentes = new Docente({
        usuario: uid,
        ...req.body
    });

    try {
        const existeidUsuario = await Docente.findOne({idUsuario});
        if (existeidUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID del Docente ya ha sido registrado'
            });
        }

        const docenteDB = await  docentes.save();
        res.json({
            ok: true,
            docentes: docenteDB
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const actializarDocentes = (req, res = response) => {
    // TODO: Validar token y comprobar si es el usuario correcto
    res.json({
        ok: true,
        msg: 'actializarDocentes'
    });
}

const borrarDocentes = ( req, res = response ) => {
    res.json({
        ok:true,
        msg: 'borrarDocentes'
    })
}

module.exports = {
    getDocentes,
    crearDocentes,
    actializarDocentes,
    borrarDocentes
}