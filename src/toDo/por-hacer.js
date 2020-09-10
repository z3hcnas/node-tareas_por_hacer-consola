const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = []

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer)
    fs.writeFile(`db/data.json`, data, function(err) {
        if (err) throw new Error('error al grabar');
        else return (`la base de datos ha sido actualizada correctamente`);
    });
}

const cargarDb = () => {
    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = []
    }

}

const crear = (description) => {
    cargarDb();

    let tarea = {
        description,
        completado: false
    }
    listadoPorHacer.push(tarea)
    guardarDB()

    return tarea
}

const getListado = () => {
    cargarDb()
    return listadoPorHacer
}

const actualizar = (description, completado) => {
    cargarDb()
    let index = listadoPorHacer.findIndex(tarea => tarea.description === description)
    if (index != -1) {
        listadoPorHacer[index].completado = completado
        guardarDB()
        return 'Se han actualizado los datos correctamente'.green
    } else {
        return 'NO se ha encontrado ninguna tarea con esa descripción'.red
    }
}

const borrar = (description) => {
    cargarDb()

    //forma para de acerlo con el splice

    let index = listadoPorHacer.findIndex(tarea => tarea.description === description)
    if (index != -1) {
        listadoPorHacer.splice(index, 1)
        guardarDB()
        return 'Se ha borrado correctamente la tarea'.green
    } else {
        return 'NO se ha encotrado una tarea para eliminar'.red
    }

}


const filter = (filter) => {

    let condition = true
    if (filter == "true") {
        condition = true
    } else if (filter == "false") {
        condition = false
    }

    cargarDb()
    let filterArray = listadoPorHacer.filter(tareas => tareas.completado === condition)
    return filterArray
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    filter
}