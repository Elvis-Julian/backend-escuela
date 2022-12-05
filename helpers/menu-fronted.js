const getMenuFronted = ( role = 'USER_ROLE' ) => {

    const menu = [
        {
          titulo: 'Asistencias',
          icono: 'mdi mdi-gauge',
          submenu: [
            // { titulo: 'Principal', url: '/' },
            // { titulo: 'Control de asistencias', url: 'control-asistencias' },
            // { titulo: 'Incidencias', url: '/' },
            { titulo: 'Reportes', url: 'reportes' }
          ]
        }
    
        // {
        //    titulo: 'Mantenimientos',
        //    icono: 'mdi mdi-folder-lock-open',
        //    submenu: [
        //     //  { titulo: 'Usuarios', url: 'usuarios' },
        //     //  { titulo: 'Administrativos', url: 'administrativos' },
        //     //  { titulo: 'Docentes', url: 'docentes' },
        //    ]
        // },
      ];

      if (role === 'ADMIN_ROLE') {
        menu[0].submenu.unshift({ titulo: 'Principal', url: '/' })
        menu[0].submenu.unshift({ titulo: 'Control de asistencias', url: 'control-asistencias' })
        menu[0].submenu.unshift({ titulo: 'Incidencias', url: '/' })

        menu[1] = {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
               { titulo: 'Administrativos', url: 'administrativos' },
               { titulo: 'Docentes', url: 'docentes' },
               { titulo: 'Usuarios', url: 'usuarios' },
            ]
         }
        
      }

      return menu;

}

module.exports = {
    getMenuFronted
}