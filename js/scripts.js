/*
function enviarFormulario(event) {
    event.preventDefault();
  
    var nombre = document.getElementById("nombre").value;
    var carEvent = document.getElementById("carEvent").value;
    var mail = document.getElementById("mail").value;
  
    var asunto = "Registro para Evento: " + carEvent;
    var cuerpoMail = "Hola Colu Cars Eventos, soy " + nombre + " " + "\nMi mail es: " + mail + "\nMe gustaíra reservar un lugar para el evento que seleccioné." + "\n\nSaludos!\n" + nombre + ".\n\n";
  
    var mailto = "mailto:colu.cars.events@unahur.edu.ar?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(cuerpoMail);
    window.open(mailto);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario-evento");
    if (form !== null) {
      form.addEventListener("submit", enviarFormulario);
    }
  });
  
  function cambiarModo() {
    const botonCambioModo = document.getElementById("botonCambioModo");
    const temaClaro = botonCambioModo.getAttribute("value") === "true";
    if (temaClaro) {
      activarModoOscuro();
      botonCambioModo.setAttribute("value", "false");
    } else {
      desactivarModoOscuro();
      botonCambioModo.setAttribute("value", "true");
    }
  }
  
  function controlarModoEnLocalStorage() {
    const modoElegidoEnLocalStorage = localStorage.getItem("modoOscuroActivadoColuCarsEvent");
    if (modoElegidoEnLocalStorage === "true") {
      activarModoOscuro();
      botonCambioModo.setAttribute("value", "false");
    } else {
      desactivarModoOscuro();
      botonCambioModo.setAttribute("value", "true");
    }
    document.querySelector("body").classList.add("visible");
  }
  
  function activarModoOscuro() {
    localStorage.setItem("modoOscuroActivadoColuCarsEvent", "true");
    document.getElementById("style-page").href = "css/styles-dark.css";
  }
  
  function desactivarModoOscuro() {
    localStorage.setItem("modoOscuroActivadoColuCarsEvent", "false");
    document.getElementById("style-page").href = "css/styles.css";
  }

  */

//LOGINN

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
    if (usuarioEncontrado.rol === "paciente") {
      window.location.href = "paciente.html?usuario=" + usuarioEncontrado.username + "&nombreUsuario=" + usuarioEncontrado.nombre + "&rol=" + usuarioEncontrado.rol;
    } else if (usuarioEncontrado.rol === "doctor") {
      window.location.href = "doctor.html?usuario=" + usuarioEncontrado.username + "&nombreUsuario=" + usuarioEncontrado.nombre + "&rol=" + usuarioEncontrado.rol;
    }
  } else {
    alert("“Usuario incorrecto");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario-login");
  if (form !== null) {
    form.addEventListener("submit", logear);
  }
});

var urlParams = new URLSearchParams(window.location.search);
var nombreDeUsuario = urlParams.get("nombreUsuario");
var rolUsuario = urlParams.get("rol");

document.addEventListener("DOMContentLoaded", function () {
  if (nombreDeUsuario) {
    if (rolUsuario === "paciente") {
      document.getElementById("titulo-inicio").textContent = "¡Bienvenido/a " + nombreDeUsuario + " a " + "Clinica Caseros!";
    } else if (rolUsuario === "doctor") {
      document.getElementById("titulo-inicio").textContent = "¡Bienvenido/a Dr. " + nombreDeUsuario;
    }
  }
});
