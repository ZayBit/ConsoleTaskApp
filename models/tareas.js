const Tarea = require("./tarea")
require('colors')
class Tareas{
    _listado = {}
    constructor(){
        this._listado = {}
    }

    borrarTarea( id = '' ){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    get listadoArr(){
        const listado = []
        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea=>{
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea( desc )
        this._listado[tarea.id] = tarea
    }

    listadoCompleto(filtrar = {}){
        console.log('\n')
        let tareas = this.listadoArr

        if(Object.keys(filtrar).length){
            if(filtrar.completado){
                tareas = tareas.filter(tarea=>tarea.completadoEn)
            }else{
                tareas = tareas.filter(tarea=>!tarea.completadoEn)
            }
        }

        tareas.forEach(( tarea , index )=>{
            const completadoEn = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red
            const posicion = `${index+1}.`.green
            const salida = `${posicion} ${tarea.desc} :: ${completadoEn}`

            console.log(salida);
            // tareasListado.push()
        })
    }

    listarCompletadasPendientes( completadas = {} ){
        this.listadoCompleto(completadas)
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id=> {
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach( tarea =>{
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null
            }
        } )
    }
}

module.exports = Tareas