document.addEventListener("DOMContentLoaded", function () {
  const nombreInput = document.getElementById("name");
  const correoInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const telefonoInput = document.getElementById("telefono");
  const fechaNacimientoInput = document.getElementById("fechaNacimiento");

  nombreInput.addEventListener("input", function () {
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,}$/;
    this.setCustomValidity(
      regexNombre.test(this.value)
        ? ""
        : "El nombre debe tener solo letras y al menos tres caracteres."
    );
  });

  correoInput.addEventListener("input", function () {
    if (!correoInput.value.endsWith(".es")) {
      correoInput.setCustomValidity(
        "Introducir una dirección de correo acabada en .es"
      );
    } else {
      correoInput.setCustomValidity("");
    }
  });

  passwordInput.addEventListener("input", function () {
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    this.setCustomValidity(
      regexPassword.test(this.value)
        ? ""
        : "La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, un dígito y un carácter especial."
    );
  });

  confirmPassword.addEventListener("input", function () {
    const password = passwordInput.value;
    this.setCustomValidity(
      this.value === password ? "" : "Las contraseñas no coinciden."
    );
  });

  telefonoInput.addEventListener("input", function () {
    const regexTelefono = /^\d{9}$/;
    this.setCustomValidity(
      regexTelefono.test(this.value)
        ? ""
        : "El teléfono debe contener exactamente 9 dígitos."
    );
  });

  fechaNacimientoInput.addEventListener("input", function () {
    const fechaIngresada = new Date(this.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaIngresada.getFullYear();
    const mes = hoy.getMonth() - fechaIngresada.getMonth();
    const dia = hoy.getDate() - fechaIngresada.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }
    this.setCustomValidity(edad >= 18 ? "" : "Debes tener al menos 18 años.");
  });
});
