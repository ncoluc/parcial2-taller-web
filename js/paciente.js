//FORMULARIO NUEVO TURNO Y FUNCIONALIDAD BOTON

document.addEventListener("DOMContentLoaded", function () {
  const formTurno = document.getElementById("form-turno");

  formTurno.addEventListener("submit", function (event) {
    event.preventDefault();
    const especialidad = document.getElementById("especialidad").value;
    const medico = document.getElementById("medico").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const email = document.getElementById("email").value;

    if (!especialidad || !medico || !fecha || !hora || !email) {
      showMessage("Verifique los datos del turno");
      return;
    }

    showMessage("Turno reservado correctamente");
    formTurno.reset();
  });

  const cancelarTurnoButtons = document.querySelectorAll(".cancelar-turno");
  cancelarTurnoButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      row.remove();

      // Verifica si quedan filas en la tabla
      const table = document.querySelector("table");
      const rows = table.querySelectorAll("tr");
      if (rows.length === 1) {
        const parrafo = document.createElement("p");
        parrafo.textContent = "No tienes ningún turno pendiente";
        table.parentNode.replaceChild(parrafo, table);
      }
    });
  });

  function showMessage(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
  }
});
