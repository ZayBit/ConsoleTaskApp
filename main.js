require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");
// const { mostrarMenu, pausa } = require("./helpers/mensajes");

console.clear();

const main = async () => {
  let opt = "";

  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    // cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Esperamos la respuesta del usuario a que seleccione una opcion de la lista y guardamos el valor en la variable (opt)
    opt = await inquirerMenu();
    // verificamos el valor de la opcion para despues trabajar con ella
    switch (opt) {
      case "1":
        // crear una nueva tarea
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        // mostrar tareas guardadas
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarCompletadasPendientes({ completado: true });
        break;
      case "4":
        tareas.listarCompletadasPendientes({ completado: false });
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Estas seguro?");
          if (ok) {
            tareas.borrarTarea(id);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    // " Presione ENTER para continuar... " ( mensaje para que el usuario continue en la aplicacion )
    if (opt !== "0") await pausa();
    // finalizamos si el valor es 0
  } while (opt !== "0");
};

main();
