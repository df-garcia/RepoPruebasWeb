let listenForDoubleClick = (element) => {
  element.contentEditable = true;
  setTimeout(function () {
    if (document.activeElement !== element) {
      element.contentEditable = false;
    }
  }, 300);
};

let change_state = (state, color, event) => {
  event.preventDefault();
  document.getElementById(
    "dropdown_state"
  ).innerHTML = `<p class="card-title">Estado</p>
                 <p class="card-cont">${state}</p>`;
  document.getElementById("estado").style.backgroundColor = color;
};

let change_item_type = (type, route, event) => {
  event.preventDefault();
  document.getElementById("foto").src = route;
  console.log(document.getElementsByClassName("foto")[0]);
  document.getElementById(
    "dropdown_state1"
  ).innerHTML = `<p class="card-title">Tipo de item</p>
                 <p class="card-cont">${type}</p>`;
  let element = document.getElementById("video-type");
  if (element != null && type !== "Video")
    element.parentNode.removeChild(element);
  else if (element == null && type === "Video") {
    let item = document.createElement("div");
    item.className = "col-2 fact-card align-self-center";
    item.innerHTML = `<p class="card-title">Tipo de Vídeo</p>
                      <p class="card-cont">Chroma</p>`;
    item.id = "video-type";
    list = document.getElementById("tags");
    list.insertBefore(item, list.childNodes[4]);
  }
};

let add_link = () => {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.href = "#";
  a.className = "links-text";
  a.contentEditable = true;

  let a1 = document.createElement("a");
  a1.href = "#";
  a1.className = "d-inline edit-link";
  a1.innerHTML = `<img
                    src="./static/editar.png"
                    alt="add"
                    class="add-btn"
                  />`;
  let a2 = document.createElement("a");
  a2.href = "#";
  a2.className = "d-inline delete-link";
  a2.innerHTML = `<img
                    src="./static/borrar.png"
                    alt="add"
                    class="add-btn"
                  />`;
  li.appendChild(a);
  li.appendChild(a1);
  li.appendChild(a2);
  a1.addEventListener("click", edit_link);
  a2.addEventListener("click", delete_link);
  document.getElementById("links-list").appendChild(li);
  a.focus();
  setTimeout(function () {
    a.contentEditable = false;
  }, 10000);
};

let edit_link = () => {
  let link = document.activeElement.parentElement.childNodes[1];
  console.log(link);
  link.contentEditable = true;
  setTimeout(function () {
    link.contentEditable = false;
  }, 10000);
};

let delete_link = () => {
  let link = document.activeElement.parentElement.remove();
};

let add_new_comment = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    let cm = document.getElementById("new-comment").value;
    if (cm != null && cm !== "") {
      let box = document.getElementById("new-comment").parentNode;
      let comment = document.createElement("div");
      comment.className = "row comment";
      comment.innerHTML = `<img
                          src="./static/user.png"
                          alt=""
                          class="comment-photo d-inline"
                        />
                        <div class="comment-message d-inline">
                          <p class="d-inline">
                            <span class="comment-author">Santiago Bolaños </span>
                            <span class="date"> 25th Sept, 2019</span>
                          </p>
                          <img
                            src="./static/reply.png"
                            alt=""
                            class="reply d-inline"
                          />
                          <p>${cm}</p>
                        </div>`;
      box.parentNode.insertBefore(comment, box.nextSibling);
      document.getElementById("new-comment").value = "";
    }
  }
};

document.getElementById("dd-plataforma").addEventListener("click", () => {
  change_state("En plataforma", "rgba(60, 160, 60, 0.9)", event);
});

document.getElementById("dd-edicion").addEventListener("click", () => {
  change_state("En Edición", "rgba(59,131, 189, 0.9)", event);
});

document.getElementById("dd-construccion").addEventListener("click", () => {
  change_state("En construcción", "rgba(229,190, 1, 0.9)", event);
});

document.getElementById("dd-montaje").addEventListener("click", () => {
  change_state("Para montaje", "rgba(87,35, 100, 0.8)", event);
});

document.getElementById("dd-revision").addEventListener("click", () => {
  change_state("Para revisión", "rgba(255,128,0, 0.9)", event);
});

document.getElementById("dd-pendiente").addEventListener("click", () => {
  change_state("Pendiente", "rgba(203,50, 52, 0.9)", event);
});

document.getElementById("dd-actividad").addEventListener("click", () => {
  change_item_type("Actividad", "./static/actividad.png", event);
});

document.getElementById("dd-audio").addEventListener("click", () => {
  change_item_type("Audio", "./static/audio.png", event);
});

document.getElementById("dd-codelab").addEventListener("click", () => {
  change_item_type("CodeLab", "./static/codelab.png", event);
});

document.getElementById("dd-cuestionario").addEventListener("click", () => {
  change_item_type("Cuestionario", "./static/cuestionario.png", event);
});

document.getElementById("dd-descarga").addEventListener("click", () => {
  change_item_type("Descarga", "./static/descarga.png", event);
});

document.getElementById("dd-foro").addEventListener("click", () => {
  change_item_type("Foro", "./static/foro.png", event);
});

document.getElementById("dd-ivq").addEventListener("click", () => {
  change_item_type("IVQ", "./static/ivq.png", event);
});

document.getElementById("dd-lectura").addEventListener("click", () => {
  change_item_type("Lectura", "./static/lectura.png", event);
});

document.getElementById("dd-mooc").addEventListener("click", () => {
  change_item_type("Mooc", "./static/mooc.png", event);
});

document.getElementById("dd-proyecto").addEventListener("click", () => {
  change_item_type("Proyecto", "./static/proyecto.png", event);
});

document.getElementById("dd-rhyme").addEventListener("click", () => {
  change_item_type("Rhyme", "./static/rhyme.png", event);
});

document.getElementById("dd-video").addEventListener("click", () => {
  change_item_type("Video", "./static/video.png", event);
});

document.getElementById("add-link").addEventListener("click", () => {
  add_link();
});

let edit_link_btns = document.getElementsByClassName("edit-link");
for (let i = 0; i < edit_link_btns.length; i++) {
  edit_link_btns[i].addEventListener("click", edit_link);
}

let delete_link_btns = document.getElementsByClassName("delete-link");
for (let i = 0; i < delete_link_btns.length; i++) {
  delete_link_btns[i].addEventListener("click", delete_link);
}

document.getElementById("new-comment").addEventListener("keyup", () => {
  add_new_comment(event);
});
