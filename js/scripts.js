//LOGIN

const usuarios = [
  { username: "mirtita", password: "123", nombre: "Mirtha Legrand", rol: "paciente" },
  { username: "house", password: "123", nombre: "Gregory House", rol: "doctor" },
];

function logear(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.username === username && usuario.password === password;
  });

  if (usuarioEncontrado) {
    localStorage.setItem("isUserLogged", "true");
    localStorage.setItem("username", usuarioEncontrado.username);
    localStorage.setItem("nombreUsuario", usuarioEncontrado.nombre);
    localStorage.setItem("rol", usuarioEncontrado.rol);
    if (usuarioEncontrado.rol === "paciente") {
      window.location.href = "paciente.html";
    } else if (usuarioEncontrado.rol === "doctor") {
      window.location.href = "doctor.html";
    }
  } else {
    alert("Usuario incorrecto");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario-login");
  if (form !== null) {
    form.addEventListener("submit", logear);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var isUserLogged = localStorage.getItem("isUserLogged");
  var nombreDeUsuario = localStorage.getItem("nombreUsuario");
  var rolUsuario = localStorage.getItem("rol");
  var botonLogin = document.querySelector(".btn-primary.boton-login");
  var botonLogout = document.querySelector(".btn-danger.boton-login");
  var currentPage = window.location.pathname;

  if (isUserLogged === "true" && nombreDeUsuario && rolUsuario) {
    botonLogin.style.display = "none";
    botonLogout.style.display = "inline-block";
    if (rolUsuario === "paciente") {
      document.getElementById("titulo-inicio").textContent = "¡Bienvenido/a " + nombreDeUsuario + " a " + "Clinica Coluccio!";

      if (currentPage === "/doctor.html") {
        var divTurno = document.querySelector("#div-turnos-doctor");
        divTurno.style.display = "none";
        var h2Turnos = document.querySelector("#turnos h2");
        h2Turnos.style.color = "red";
        h2Turnos.textContent = "Usted no tiene acceso en esta página";
      }
    } else if (rolUsuario === "doctor") {
      document.getElementById("titulo-inicio").textContent = "¡Bienvenido/a Dr. " + nombreDeUsuario + " a " + "Clinica Coluccio!";

      if (currentPage === "/paciente.html") {
        var divTabla = document.querySelector("#turnos .div-tabla");
        var divNuevoTurno = document.querySelector("#nuevo-turno .div-nuevo-turno");
        var h2NuevosTurnos = document.querySelector("#nuevo-turno h2");

        divTabla.style.display = "none";
        divNuevoTurno.style.display = "none";
        h2NuevosTurnos.style.display = "none";

        var h2Turnos = document.querySelector("#turnos h2");
        h2Turnos.style.color = "red";
        h2Turnos.textContent = "Usted no tiene acceso en esta página";
      }
    }
  } else {
    botonLogin.style.display = "inline-block";
    botonLogout.style.display = "none";

    if (currentPage === "/paciente.html") {
      var divTabla = document.querySelector("#turnos .div-tabla");
      var divNuevoTurno = document.querySelector("#nuevo-turno .div-nuevo-turno");

      divTabla.style.display = "none";
      divNuevoTurno.style.display = "none";

      var h2Turnos = document.querySelector("#turnos h2");
      var h2NuevosTurnos = document.querySelector("#nuevo-turno h2");
      h2Turnos.textContent = "Inicia sesión para ver tus turnos";
      h2NuevosTurnos.textContent = "Inicia sesión para solicituar un nuevo turno";
    } else if (currentPage === "/doctor.html") {
      var divTurno = document.querySelector("#div-turnos-doctor");
      divTurno.style.display = "none";
      var h2Turnos = document.querySelector("#turnos h2");

      h2Turnos.textContent = "Inicie sesión para ver sus turnos Dr.";
    }
  }
});

function logoutUsuario() {
  localStorage.setItem("isUserLogged", "false");
  localStorage.removeItem("username");
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("rol");
  alert("¡Te has deslogeado. Te redireccionamos a la pagina de inicio!");
  window.location.href = "index.html";
}
