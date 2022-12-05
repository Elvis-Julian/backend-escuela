const { response } = require('express');
// const  bcrypt  = require('bcryptjs');

const Docente = require('../models/docentes');
// const { generateJWT } = require('../helpers/jwt');


const getDocentes = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const [docentes, total] = await Promise.all([
        Docente
        .find({}, 'idUsuario nombre fecha hora_ent hora_sld img') // Definen los datos a mostrar
        .skip( desde )
        .limit( 5 ),
    Docente.countDocuments()
    ])
    // Se define que se obtiene en la consulta
    res.json({
        ok: true,
        docentes,
        total
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

const actualizarDocentes = async (req, res = response) => {
    const id =  req.params.id; 
    const uid = req.uid;

    try {
        const docenteDB = await Docente.findById( id );
        if ( !docenteDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Docente no encontrado por ID'
            });
            
        }

        const cambiosDocente = {
            ...req.body,
            usuario: uid
        }
        const docenteActualizado = await Docente.findByIdAndUpdate( id, cambiosDocente, { new: true } );

        res.json({
            ok: true,
            docente: docenteActualizado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarDocentes = async( req, res = response ) => {
    const id =  req.params.id; 

    try {
        const docenteBD = await Docente.findById( id );
        if ( !docenteBD ) {
            return res.status(404).json({
                ok: true,
                msg: 'Docente no encontrado por ID'
            });
        }

        await Docente.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg:'Docente eliminado'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getDocentes,
    crearDocentes,
    actualizarDocentes,
    borrarDocentes
}