document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos el enlace usando su id
    const enlaceToggle = document.getElementById('toggle');
    
    // Añadimos un event listener para el evento click
    enlaceToggle.addEventListener('click', function(event) {
      event.preventDefault();  // Prevenimos el comportamiento por defecto del enlace
      muestraOculta();         // Llamamos a la función para alternar la visibilidad
    });
  });
  
  // Función que alterna la visibilidad de la frase
  function muestraOculta() {
    // Seleccionamos el elemento con id "frase"
    const frase = document.getElementById('frase');
  
    // Si el elemento está oculto (o no tiene valor de display), se muestra; si no, se oculta
    if (frase.style.display === 'none' || frase.style.display === '') {
      frase.style.display = 'block';
    } else {
      frase.style.display = 'none';
    }
  }
  