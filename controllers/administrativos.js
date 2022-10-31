const { response } = require('express');
// const  bcrypt  = require('bcryptjs');

 const Administrativo = require('../models/administrativos');
// const { generateJWT } = require('../helpers/jwt');


const getAdministrativos = async (req, res = response) => {

    const administrativos = await Administrativo.find()
                                                .populate('usuario', 'nombre')
    // Se define que se obtiene en la consulta
    res.json({
        ok: true,
        administrativos
    });

}

const crearAdministrativos = async (req, res = response) => {
    const uid = req.uid;
    const {idUsuario} = req.body;
    const administrativos = new Administrativo({
        usuario: uid,
        ...req.body
    });

    try {
        // Validacion de Id admint unico
        const existeidUsuario = await Administrativo.findOne({ idUsuario });
        if (existeidUsuario) {
            return res.status(400).json({
                ok: false,
                msg: "El ID del administrativo ya ha sido registrado"
            });
        }

       // Guardar administrador creado
        const admintDB = await administrativos.save();
        res.json({
            ok: true,
            administrativos: admintDB
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const actualizarAdministrativos = async ( req, res = response ) => {
    // TODO: Validar token y comprobar si es el usuario correcto

    const id =  req.params.id; 
    const uid = req.uid;

    try {
        const administrativoDB = await Administrativo.findById( id );
        if ( !administrativoDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Administrativo no encontrado por ID'
            });
            
        }

        const cambiosAdmint = {
            ...req.body,
            usuario: uid
        }
        const administrativoActualizado = await Administrativo.findByIdAndUpdate( id, cambiosAdmint, { new: true } );

        res.json({
            ok: true,
            administrativo: administrativoActualizado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarAdministrativos = async ( req, res = response ) => {
    const id =  req.params.id; 

    try {
        const administrativoDB = await Administrativo.findById( id );
        if ( !administrativoDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Administrativo no encontrado por ID'
            });
        }

        await Administrativo.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg:'Administrativo eliminado'
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
    getAdministrativos,
    crearAdministrativos,
    actualizarAdministrativos,
    borrarAdministrativos
}