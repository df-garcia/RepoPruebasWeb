let btnAgregarLeccion = document.getElementById("saveImage");
btnAgregarLeccion.addEventListener("click", agregarLeccion);

let idLeccion = 0;
let sideBar = document.getElementById("sideBar");

let arregloLecccion = [];

let idCardGlobal = -1;
function agregarLeccion() {
  $("#squarespaceModal").modal("toggle");
  let botones = [];
  let leccion = new Object();
  leccion.id = idLeccion;
  leccion.nombre = document.getElementById("exampleInputEmail1").value;
  leccion.tareas = [];
  arregloLecccion.push(leccion);

  paraAgregar.innerHTML = "";
  sideBar.innerHTML = "";
  let cadenaPrincipal = "";
  let cadenaSidebar = "";
  for (let i = 0; i < arregloLecccion.length; i++) {
    cadenaPrincipal = `
  <div class="card">
  <div class="card-header" id="heading${arregloLecccion[i].id}>
    <h5 class="mb-0">
      <button
        class="btn btn-link"
        data-toggle="collapse"
        data-target="#collapse${arregloLecccion[i].id}"
        aria-expanded="false"
        aria-controls="collapse${arregloLecccion[i].id}"
      >
        ${arregloLecccion[i].nombre}
      </button>
    </h5>
  </div>

  <div
    id="collapse${arregloLecccion[i].id}"
    class="collapse show"
    aria-labelledby="heading${arregloLecccion[i].id}"
    data-parent="#accordion"
  >
    <div class="card-body" id="contenidoCard * ${arregloLecccion[i].id}">
        <p style="text-decoration: none;" class="text-center">Aún no has agregado ninguna tarea, da click para agregar la primera!</p>
       
    </div>
    <button
    type="button"
    class="btn text-center center-block"
    data-toggle="collapse"
    data-target="#collapseLeccion${arregloLecccion[i].id}"
    aria-expanded="false"
    id="${arregloLecccion[i].id}"
    aria-controls="collapse${arregloLecccion[i].id}"
    onclick="aja(${arregloLecccion[i].id})"
    style="margin: 5px;"
    
  >
    <i class="fas fa-plus" style="padding-right: 5px"></i>
    Añadir una tarea</button
  >
  </div>
  </div>
`;
    cadenaSidebar = `
            <li class="active">
              <a
                href="#leccion${arregloLecccion[i].id}"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle"
                >${arregloLecccion[i].nombre}</a
              >
              <ul class="collapse list-unstyled" id="leccion${arregloLecccion[i].id}">`;
    paraAgregar.innerHTML += cadenaPrincipal;
    sideBar.innerHTML += cadenaSidebar;
    let btnAgregarTarea = document.getElementById(`${arregloLecccion[i].id}`);
    botones.push(btnAgregarTarea);
  }

  /**for (let i = 0; i < botones.length; i++) {
    console.log(botones[i]);
    let button = document.getElementById(arregloLecccion[i].id);
    button.addEventListener(
      "click",
      mostrarModalTareaNueva(`${arregloLecccion[i].id}`)
    );
  }*/
  idLeccion++;
  renderTareas();
}

function aja(lecciooon) {
  idCardGlobal = lecciooon;
  mostrarModalTareaNueva();
}
function mostrarModalTareaNueva() {
  $("#modalTarea").modal("show");
}

function agregarTarea() {
  let objetoTarea = new Object();
  console.log("Una vez");
  let leccionActual;
  for (let i = 0; i < arregloLecccion.length; i++) {
    if (arregloLecccion[i].id == idCardGlobal) {
      leccionActual = arregloLecccion[i];
    }
  }
  let arregloTemp = [];
  for (let i = 0; i < leccionActual.tareas.length; i++) {
    arregloTemp.push(leccionActual.tareas[i]);
  }

  console.log(leccionActual.tareas);
  let cuerpoCarta = document.getElementById(`contenidoCard * ${idCardGlobal}`);
  let cuerpoLeccionSidebar = document.getElementById(`leccion${idCardGlobal}`);
  console.log(cuerpoLeccionSidebar);

  cuerpoCarta.innerHTML = "";
  let cadenaCard = "";
  let cadenaSideBar = "";
  let name = document.getElementById("inputNombreTareaModal").value;
  let response = document.getElementById("responsableTareaModal").value;
  objetoTarea.nombre = name;
  objetoTarea.responsable = response;
  arregloTemp.push(objetoTarea);
  leccionActual.tareas = arregloTemp;
  for (let i = 0; i < leccionActual.tareas.length; i++) {
    cadenaCard = `
    <input
      type="radio"
      class="radio2"
      name="test2"
      id="b1"
      checked
    />
    <span
      style="background-color: rgb(98, 216, 98)"
      class="badge badge-secondary"
      >${leccionActual.tareas[i].responsable}</span
    >
    <a href="./resource_detail.html" id="hoverTareas"
      >${leccionActual.tareas[i].nombre}</a
    >
      
    <select class="custom-select-sm">
      <option selected>Estado</option>
      <option value="1">Listo para montaje</option>
      <option value="2">Pendiente</option>
      <option value="2">En edición</option>
      <option value="2">En plataforma</option>
      <option value="2">Eliminar de Coursera</option>
      <option value="2">Escaleta en construcción</option>
      <option value="2">
        Para revisión del equipo docente
      </option></select
    ><br /><br />
   `;

    cadenaSideBar = `
   <li>
   <a href="#">${leccionActual.tareas[i].nombre}</a>
  </li>`;
    $("#modalTarea").modal("toggle");
    cuerpoLeccionSidebar.innerHTML += cadenaSideBar;
    cuerpoCarta.innerHTML += cadenaCard;
  }
}
function renderTareas() {
  for (let j = 0; j < arregloLecccion.length; j++) {
    let cuerpoCarta = document.getElementById(
      `contenidoCard * ${arregloLecccion[j].id}`
    );
    let cuerpoLeccionSidebar = document.getElementById(
      `leccion${arregloLecccion[j].id}`
    );
    cuerpoLeccionSidebar.innerHTML = "";
    cuerpoCarta.innerHTML = "";
    for (let i = 0; i < arregloLecccion[j].tareas.length; i++) {
      cadena = `
        <input
          type="radio"
          class="radio2"
          name="test2"
          id="b1"
          checked
        />
        <span
          style="background-color: rgb(98, 216, 98)"
          class="badge badge-secondary"
          >${arregloLecccion[j].tareas[i].responsable}</span
        >
        <a href="./resource_detail.html" id="hoverTareas"
          >${arregloLecccion[j].tareas[i].nombre}</a
        >
          
        <select class="custom-select-sm">
          <option selected>Estado</option>
          <option value="1">Listo para montaje</option>
          <option value="2">Pendiente</option>
          <option value="2">En edición</option>
          <option value="2">En plataforma</option>
          <option value="2">Eliminar de Coursera</option>
          <option value="2">Escaleta en construcción</option>
          <option value="2">
            Para revisión del equipo docente
          </option></select
        ><br /><br />
       `;
      cadenaSide = ` 
       <li>
       <a href="#">${arregloLecccion[j].tareas[i].nombre}</a>
      </li>`;

      $("#modalTarea").modal("toggle");

      cuerpoLeccionSidebar.innerHTML += cadenaSide;
      cuerpoCarta.innerHTML += cadena;
    }
  }
}
