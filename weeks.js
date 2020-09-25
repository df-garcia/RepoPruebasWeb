const url = "https://testing-mooc-vue.firebaseio.com/semanas.json";

let datos = "";
//Se traen los datos
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    datos = data;
    renderInicial();
    console.log(datos);
  });

//Carga inicial (semana 1)

let numSemanaSelected = 0;
let semanaActual = 0;
let actualWeek = 0;

let numerosSemana = [];
for (let i = 1; i < 9; i++) {
  numerosSemana.push(i);
}

let renderInicial = () => {
  //Se establece el numero de semanas y se actualiza el sidebar
  let numSemanas = datos.length;
  semanaActual = datos.length;
  actualWeek = 1;
  let semanasListSidebar = "";
  for (let i = 0; i < numSemanas; i++) {
    semanasListSidebar += `
    <li>
      <a id="semana${i + 1}" class="dropdown-toggle text-center">Semana ${
      i + 1
    }</a>
    </li>`;
    let index = numerosSemana.indexOf(i + 1);
    numerosSemana.splice(index, 1);
  }

  let buttonsDropdown = "";
  for (let i = 0; i < numerosSemana.length; i++) {
    buttonsDropdown += `<button class="dropdown-item" type="button" onclick="updateSelectedSemana(${numerosSemana[i]})">
      ${numerosSemana[i]}
    </button>`;
  }
  document.getElementById("dropNumSemana").innerHTML = buttonsDropdown;
  document.getElementById("semanasSidebar").innerHTML = semanasListSidebar;

  for (let i = 0; i < numSemanas; i++) {
    document.getElementById(`semana${i + 1}`).addEventListener("click", () => {
      updateNameObjectives(i + 1);
      updateItems(i + 1);
    });
  }

  //------------Right section----------------

  //Se actualiza el nombre y objetivos de la semana (semana 1)
  updateNameObjectives(1);
  //Se actualiza la seccion de items
  updateItems(1);
  //pruebas(1);
};

//Sort list semanas
let sortList = (ul) => {
  var ul = document.getElementById(ul);

  Array.from(ul.getElementsByTagName("LI"))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach((li) => ul.appendChild(li));
};

//Anhadir semana (sidebar)
document.getElementById("addSemana").addEventListener("click", () => {
  addSemana();
  document.getElementById("nombreSemana").value = "";
  document.getElementById("objetivosSemana").value = "";
});
let addSemana = () => {
  semanaActual++;
  //Se toman los datos
  let semanasActuales = document.getElementById("semanasSidebar").innerHTML;
  let nombreSemanaNueva = document.getElementById("nombreSemana").value;
  let objetivosNuevaSemana = document.getElementById("objetivosSemana").value;
  //Se anhade la semana al sidebar
  let nuevaSemana = `<li>
  <a id="semana${semanaActual}" class="dropdown-toggle text-center">Semana ${semanaActual}</a>
  </li>`;
  document.getElementById("semanasSidebar").innerHTML =
    semanasActuales + nuevaSemana;
  sortList("semanasSidebar");
  updateNumSemanas(semanaActual);
  /*document
    .getElementById(`semana${numSemanaSelected}`)
    .addEventListener("click", () => {
      updateNameObjectives(numSemanaSelected);
      document.getElementById("cardsContainer").innerHTML = "";
    });*/
  //Se anhade la nueva semana a los datos
  let newSemana = {
    nombre: nombreSemanaNueva,
    objetivos: objetivosNuevaSemana,
  };
  datos.push(newSemana);
  for (let i = 0; i < datos.length; i++) {
    document.getElementById(`semana${i + 1}`).addEventListener("click", () => {
      updateNameObjectives(i + 1);
      updateItems(i + 1);
    });
  }
};

//Actualizar numSemanas

let updateSelectedSemana = (selected) => {
  numSemanaSelected = selected;
};

let updateNumSemanas = (numSemana) => {
  numerosSemana.splice(numerosSemana.indexOf(parseInt(numSemana)), 1);
  let buttonsDropdown = "";
  for (let i = 0; i < numerosSemana.length; i++) {
    buttonsDropdown += `<button class="dropdown-item" type="button" onclick="updateSelectedSemana(${numerosSemana[i]})">
        ${numerosSemana[i]}
    </button>`;
  }
  document.getElementById("dropNumSemana").innerHTML = buttonsDropdown;
};

//-------------------------Actualizar right section------------------------------------------------

//Actualizar objetivos y nombre

let updateNameObjectives = (idSemana) => {
  actualWeek = idSemana;
  document.getElementById("objectiveText").innerHTML =
    datos[idSemana - 1].objetivos;
  document.getElementById("nombreSemanaText").innerHTML =
    "Semana " + idSemana.toString() + ": " + datos[idSemana - 1].nombre;
};

//Actualizar los items con sus responsables

/*let pruebas = (idSemana) => {
  let weekName = "Semana " + idSemana.toString();

  datos.map((semana) => {
    if (semana.nombre == weekName) {
      semana.lecciones.map((leccion) => {
        leccion.items.map((item) => {
          console.log(item.nombre);
        });
      });
    }
  });
};*/

let updateItems = (idSemana) => {
  console.log(idSemana);
  document.getElementById("cardsContainer").innerHTML = "";
  //let weekName = "Semana " + idSemana.toString();
  idSemana--;
  datos.map((semana, index) => {
    if (index === idSemana) {
      try {
        semana.lecciones.map((leccion) => {
          leccion.items.map((item) => {
            let bodyCard = "";
            let itemDescription = item.descripcion;
            let itemLink = item.links;
            let itemName = item.nombre;
            const editItem = "./resource_detail.html";
            const resources = "./resources.html";

            let tipoItem = "";
            if (item.tipo == "Video") {
              tipoItem = `<i class="fa fa-file-video-o" aria-hidden="true"></i>`;
            } else if (item.tipo == "Lectura") {
              tipoItem = `<i class="fa fa-book" aria-hidden="true"></i>`;
            } else {
              tipoItem = `<i class="fa fa-tasks" aria-hidden="true"></i>`;
            }

            //
            bodyCard += `<div class="card">
      <div class="card-body">
        <h5 class="card-title">
          ${tipoItem}
          <a href="https://${itemLink}" target="_blank"
            >Item: ${itemName}</a
          >
        </h5>
        <p class="card-text">
          ${itemDescription}
        </p>
        <a href="./resource_detail.html">
          <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
        </a>
        <a href="./resources.html"><strong>Lección</strong></a>
      </div>`;
            //
            let footerCard = "";
            item.participantes.map((resp) => {
              let randomColor = Math.round(Math.random());
              let randomProfesion = Math.round(Math.random());
              let color = "";
              let profesion = "";
              if (randomColor === 1) {
                color = "#f7f1ed";
              } else {
                color = "#febeb0";
              }
              if (randomProfesion === 1) {
                profesion = "Profesor";
              } else {
                profesion = "Pedagogo";
              }
              footerCard += `<div class="process-step">
              <button
                style="background-color: ${color}"
                type="button"
                class="btn btn-default btn-circle"
                disabled="disabled"
              >
                <i class="fa fa-user fa-2x"></i>
              </button>
              <br /><small
                >${resp}<br /><i>${profesion}</i></small>
            </div>`;
            });
            let inicioFoot = `<div class="card-footer">
                                <div class="process">
                                  <div class="process-row">`;
            let finFoot = `</div>
            </div>
          </div>`;
            let anterior = document.getElementById("cardsContainer").innerHTML;
            document.getElementById("cardsContainer").innerHTML =
              anterior +
              bodyCard +
              inicioFoot +
              footerCard +
              finFoot +
              "</div>";
          });
        });
      } catch (error) {
        console.log(error);
        document.getElementById("cardsContainer").innerHTML = "";
      }
    }
  });
};

//Anhadir leccion

document.getElementById("crearLeccion").addEventListener("click", () => {
  addLeccion();
});

let addLeccion = () => {
  let semana = undefined;
  datos.map((x, index) => {
    if (index + 1 == semanaActual) {
      semana = x;
    }
  });
  let newLeccion = {
    nombre: document.getElementById("nombreLeccion").value,
    objetivos: document.getElementById("temaLeccion").value,
  };
  try {
    semana.lecciones.push(newLeccion);
  } catch (error) {
    semana.lecciones = [];
    semana.lecciones.push(newLeccion);
  }
};

//Anhadir item

document.getElementById("crearItem").addEventListener("click", () => {
  addItem();
});

let addItem = () => {
  let newItem = {
    nombre: document.getElementById("nombreItem").value,
    descripcion: document.getElementById("descItem").value,
    links: document.getElementById("linkItem").value,
    tipo: "Video",
    participantes: ["Jose Bocanegra", "Mario Hurtado"],
  };
  let semana = undefined;
  datos.map((x, index) => {
    if (index + 1 == semanaActual) {
      semana = x;
    }
  });
  try {
    semana.lecciones[0].items.push(newItem);
  } catch (error) {
    semana.lecciones[0].items = [];
    semana.lecciones[0].items.push(newItem);
  }
  console.log(datos);
  updateItems(semanaActual);
};

//Collapse sidebar screen size
/*window.addEventListener(
  "resize",
  (collapserLeftMenu = () => {
    if (screen.width <= 768) {
      document.getElementById("collapseExample").className = "collapse";
    } else if (screen.width > 768) {
      document.getElementById("collapseExample").className = "collapse show";
    }
  })
);*/
