//LOGIN

const usuarios = [
  { username: "mirtita", password: "123", nombre: "Mirtha Legrand", rol: "paciente" },
  { username: "house", password: "123", nombre: "Gregory House", rol: "doctor" },
];

function logear(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const usuarioEncontrado = usuarios.find((usuario) => usuario.username === username && usuario.password === password);

  if (usuarioEncontrado) {
    localStorage.setItem("isUserLogged", "true");
    localStorage.setItem("username", usuarioEncontrado.username);
    localStorage.setItem("nombreUsuario", usuarioEncontrado.nombre);
    localStorage.setItem("rol", usuarioEncontrado.rol);
    const currentPage = window.location.pathname;
    if (usuarioEncontrado.rol === "paciente") {
      redireccionar("paciente.html");
    } else if (usuarioEncontrado.rol === "doctor") {
      redireccionar("doctor.html");
    }
  } else {
    alert("Usuario incorrecto");
  }
}

function redireccionar(pagina) {
  window.location.href = pagina;
}

function mostrarElemento(elemento) {
  elemento.style.display = "inline-block";
}

function ocultarElemento(elemento) {
  elemento.style.display = "none";
}

function actualizarTexto(elemento, texto) {
  elemento.textContent = texto;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario-login");
  if (form !== null) {
    form.addEventListener("submit", logear);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const isUserLogged = localStorage.getItem("isUserLogged");
  const nombreDeUsuario = localStorage.getItem("nombreUsuario");
  const rolUsuario = localStorage.getItem("rol");
  const botonLogin = document.querySelector(".btn-primary.boton-login");
  const botonLogout = document.querySelector(".btn-danger.boton-login");
  const currentPage = window.location.pathname;

  if (isUserLogged === "true" && nombreDeUsuario && rolUsuario) {
    ocultarElemento(botonLogin);
    mostrarElemento(botonLogout);
    const tituloInicio = document.getElementById("titulo-inicio");
    if (rolUsuario === "paciente") {
      actualizarTexto(tituloInicio, `¡Bienvenido/a ${nombreDeUsuario} a Clinica Coluccio!`);

      if (currentPage.includes("/doctor.html")) {
        ocultarElemento(document.querySelector("#div-turnos-doctor"));
        const h2Turnos = document.querySelector("#turnos h2");
        h2Turnos.style.color = "red";
        actualizarTexto(h2Turnos, "Usted no tiene acceso en esta página");
      }
    } else if (rolUsuario === "doctor") {
      actualizarTexto(tituloInicio, `¡Bienvenido/a Dr. ${nombreDeUsuario} a Clinica Coluccio!`);

      if (currentPage.includes("/paciente.html")) {
        ocultarElemento(document.querySelector("#turnos .div-tabla"));
        ocultarElemento(document.querySelector("#nuevo-turno .div-nuevo-turno"));
        ocultarElemento(document.querySelector("#nuevo-turno h2"));
        const h2Turnos = document.querySelector("#turnos h2");
        h2Turnos.style.color = "red";
        actualizarTexto(h2Turnos, "Usted no tiene acceso en esta página");
      }
    }
  } else {
    mostrarElemento(botonLogin);
    ocultarElemento(botonLogout);

    if (currentPage.includes("/paciente.html")) {
      ocultarElemento(document.querySelector("#turnos .div-tabla"));
      ocultarElemento(document.querySelector("#nuevo-turno .div-nuevo-turno"));
      const h2Turnos = document.querySelector("#turnos h2");
      const h2NuevosTurnos = document.querySelector("#nuevo-turno h2");
      actualizarTexto(h2Turnos, "Inicia sesión para ver tus turnos");
      actualizarTexto(h2NuevosTurnos, "Inicia sesión para solicituar un nuevo turno");
    } else if (currentPage.includes("/doctor.html")) {
      ocultarElemento(document.querySelector("#div-turnos-doctor"));
      const h2Turnos = document.querySelector("#turnos h2");
      actualizarTexto(h2Turnos, "Inicie sesión para ver sus turnos Dr.");
    }
  }
});

function logoutUsuario() {
  localStorage.setItem("isUserLogged", "false");
  localStorage.removeItem("username");
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("rol");
  alert("¡Te has deslogeado. Te redireccionamos a la página de inicio!");
  redireccionar("index.html");
}
