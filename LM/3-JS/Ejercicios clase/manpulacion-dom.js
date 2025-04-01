
/**
 * Agrega un enlace a un párrafo dado su índice.
 * @param {number} paragraphIndex - Índice del párrafo.
 * @param {string} url - URL a enlazar.
 * @param {string} linkText - Texto del enlace.
 */
function appendLinkToParagraph(paragraphIndex, url, linkText) {
  const paragraphs = document.querySelectorAll('p');
  if (paragraphs[paragraphIndex]) {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = linkText;
    paragraphs[paragraphIndex].appendChild(link);
  }
}

/**
 * Inserta un nuevo párrafo antes de otro párrafo especificado por su índice.
 * @param {number} index - Índice del párrafo antes del cual se inserta el nuevo.
 * @param {string} text - Contenido del nuevo párrafo.
 * @param {string} [color] - Color del texto (opcional).
 */
function insertNewParagraph(index, text, color) {
  const parrafoNuevo = document.createElement('p');
  parrafoNuevo.textContent = text;
  parrafoNuevo.style.color = color;

  const parrafos = document.querySelectorAll('p');
  parrafos[index].before(parrafoNuevo)
}

/**
 * Elimina un párrafo basado en su índice.
 * @param {number} index - Índice del párrafo a eliminar.
 */
function removeParagraph(index) {
  const parrafos = document.querySelectorAll('p');
  parrafos[index].remove();
}

/**
 * Función de inicialización que ejecuta todas las modificaciones sobre el DOM.
 */
function init() {
  appendLinkToParagraph(2, ' https://www.marca.com', 'ir a la URL de marca');
  insertNewParagraph(3, 'Inyeccion de nuevo texto', 'green');
  removeParagraph(1);
  
}

init();
