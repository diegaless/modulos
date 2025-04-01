    const usuarioInput = document.getElementById("usuario");
    const codigoPostalInput = document.getElementById("codigoPostal");
  
    
    usuarioInput.addEventListener("input", function () {
      const regexUsuario = /^[a-zA-Z0-9_-]{4,15}$/;
      this.setCustomValidity(
        regexUsuario.test(this.value)
          ? ""
          : "El usuario debe tener entre 4 y 15 caracteres y solo puede incluir letras, números, guiones y guiones bajos."
      );
    });
 
    codigoPostalInput.addEventListener("input", function () {
      const regexCodigoPostal = /^\d{5}$/;
      this.setCustomValidity(
        regexCodigoPostal.test(this.value)
          ? ""
          : "El código postal debe contener exactamente 5 dígitos."
      );
    });

  