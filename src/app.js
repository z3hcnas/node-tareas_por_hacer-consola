const argv = require('./config/yargs').argv
const porHacer = require('./toDo/por-hacer')

let command = argv._[0]

switch (command) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion)
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado()
        for (let tarea of listado) {
            console.log('**************Tarea**************'.green);
            console.log(`${tarea.description}`.cyan);
            console.log(`Estado: ${tarea.completado}`.magenta);
            console.log('*********************************\n'.green);
        }

        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.d, argv.c)
        console.log(actualizado);

        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.d)
        console.log(borrado);
        break;

    case 'filter':
        let listadoFiltrado = porHacer.filter(argv.c)
        for (let tarea of listadoFiltrado) {
            console.log('**************Tarea**************'.green);
            console.log(`${tarea.description}`.cyan);
            console.log(`Estado: ${tarea.completado}`.magenta);
            console.log('*********************************\n'.green);
        }
        break;

    default:
        console.log('comando no encontrado');
}