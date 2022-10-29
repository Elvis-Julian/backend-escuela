const fs = require('fs');

const Usuario = require('../models/usuario');
const Administrativo = require('../models/administrativos');
const Docente = require('../models/docentes');

const BorrarImagen = (path) =>{

    if (fs.existsSync( path )) {
        // Borrar la imagen de la anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {

    switch ( tipo ) {
        case 'administrativos':
            const administrativo = await Administrativo.findById(id);
            if (!administrativo) {
                console.log('No es un administrativo')
                return false;
            }

            const pathViejo = `./uploads/administrativos/${ administrativo.img }`;
            BorrarImagen( pathViejo );
            
            administrativo.img = nombreArchivo;
            await administrativo.save();
            return true;
            break;

        case 'docentes':
            const docente = await Docente.findById(id);
            if (!docente) {
                console.log('No es un docente')
                return false;
            }

            const pathViejo2 = `./uploads/docentes/${ docente.img }`;
            BorrarImagen( pathViejo2 );
            
            docente.img = nombreArchivo;
            await docente.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario')
                return false;
            }

            const pathViejo3 = `./uploads/usuarios/${ usuario.img }`;
            BorrarImagen( pathViejo3 );
            
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
            
    }

}

module.exports = {
    actualizarImagen
}