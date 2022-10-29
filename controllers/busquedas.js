const { response } = require('express');
const Usuario = require('../models/usuario');
const Admint = require('../models/administrativos');
const Docente = require('../models/docentes');

// Realizar busquedas en general
const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const rege = new RegExp( busqueda, 'i' ); 

    const [usuarios, administrativos, docentes] = await Promise.all([
        Usuario.find({ nombre: rege }),
        Admint.find({ nombre: rege }),
        Docente.find({ nombre: rege }),
    ])

    res.json({
        ok: true,
        usuarios,
        administrativos,
        docentes
    });
}


const getDocumentos = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const rege = new RegExp( busqueda, 'i' ); 
    let data = [];

// Buscar por seccion o coleccion
    switch (tabla) {
        case 'administrativos':
                data = await Admint.find({ nombre: rege })
                                        .populate('usuario', 'nombre img');
            break;

            case 'docentes':
                data = await Docente.find({ nombre: rege })
                                        .populate('usuario', 'nombre img');
            break;

            case 'usuarios':
                data = await Usuario.find({ nombre: rege });
                
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/administrativos/docentes'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentos
}