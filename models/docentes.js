const { Schema, model } = require('mongoose');

const DocenteSchema = Schema({

    idUsuario: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: String
    },
    hora_ent: {
        type: String 
    },
    hora_sld: {
        type: String
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

//Omitir la consulta de estas acciones
DocenteSchema.method('toJSON', function() {
     const { __v, ...object } = this.toObject();
     return object;
})

module.exports = model( 'Docente', DocenteSchema );