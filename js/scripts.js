//LOGIN

const usuarios = [
  { username: "mirtita", password: "123", nombre: "Mirtha Legrand", rol: "paciente" },
  { username: "house", password: "123", nombre: "Gregory House", rol: "doctor" },
];

function logear(event) {
  event.preventDefault();
  const username = obtenerElemento("#username").value;
  const password = obtenerElemento("#password").value;

  const usuarioEncontrado = usuarios.find((usuario) => usuario.username === username && usuario.password === password);

  if (usuarioEncontrado) {
    localStorage.setItem("isUserLogged", "true");
    localStorage.setItem("username", usuarioEncontrado.username);
    localStorage.setItem("nombreUsuario", usuarioEncontrado.nombre);
    localStorage.setItem("rol", usuarioEncontrado.rol);

    if (usuarioEncontrado.rol === "paciente") {
      redireccionar("paciente.html");
    } else if (usuarioEncontrado.rol === "doctor") {
      redireccionar("doctor.html");
    }
  } else {
    alert("Usuario incorrecto");
  }
}

function obtenerElemento(consulta) {
  return document.querySelector(consulta);
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
  const form = obtenerElemento("#formulario-login");
  if (form !== null) {
    form.addEventListener("submit", logear);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const isUserLogged = localStorage.getItem("isUserLogged");
  const username = localStorage.getItem("username");
  const nombreDeUsuario = localStorage.getItem("nombreUsuario");
  const rolUsuario = localStorage.getItem("rol");
  const botonLogin = obtenerElemento(".btn-primary.boton-login");
  const botonLogout = obtenerElemento(".btn-danger.boton-login");
  const divImagenUsuario = obtenerElemento(".div-imagen-intro");
  const currentPage = window.location.pathname;

  if (isUserLogged === "true" && nombreDeUsuario && rolUsuario) {
    ocultarElemento(botonLogin);
    mostrarElemento(botonLogout);
    const tituloInicio = obtenerElemento("#titulo-inicio");
    obtenerElemento("#imagen-user").src = `media/imagenes/fotos-usuarios/${username}.jpg`;
    if (rolUsuario === "paciente") {
      actualizarTexto(tituloInicio, `¡Bienvenido/a ${nombreDeUsuario} a Clínica Coluccio!`);

      if (currentPage.includes("/doctor.html")) {
        ocultarElemento(obtenerElemento("#div-turnos-doctor"));
        const h2Turnos = obtenerElemento("#turnos h2");
        h2Turnos.style.color = "red";
        actualizarTexto(h2Turnos, "Usted no tiene acceso en esta página");
      }
    } else if (rolUsuario === "doctor") {
      actualizarTexto(tituloInicio, `¡Bienvenido/a Dr. ${nombreDeUsuario} a Clínica Coluccio!`);

      if (currentPage.includes("/paciente.html")) {
        ocultarElemento(obtenerElemento("#turnos .div-tabla"));
        ocultarElemento(obtenerElemento("#nuevo-turno .div-nuevo-turno"));
        ocultarElemento(obtenerElemento("#nuevo-turno h2"));
        const h2Turnos = obtenerElemento("#turnos h2");
        h2Turnos.style.color = "red";
        actualizarTexto(h2Turnos, "Usted no tiene acceso en esta página");
      }
    }
  } else {
    mostrarElemento(botonLogin);
    ocultarElemento(botonLogout);
    ocultarElemento(divImagenUsuario);

    if (currentPage.includes("/paciente.html")) {
      ocultarElemento(obtenerElemento("#turnos .div-tabla"));
      ocultarElemento(obtenerElemento("#nuevo-turno .div-nuevo-turno"));
      const h2Turnos = obtenerElemento("#turnos h2");
      const h2NuevosTurnos = obtenerElemento("#nuevo-turno h2");
      actualizarTexto(h2Turnos, "Inicia sesión para ver tus turnos");
      actualizarTexto(h2NuevosTurnos, "Inicia sesión para solicituar un nuevo turno");
    } else if (currentPage.includes("/doctor.html")) {
      ocultarElemento(obtenerElemento("#div-turnos-doctor"));
      const h2Turnos = obtenerElemento("#turnos h2");
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
