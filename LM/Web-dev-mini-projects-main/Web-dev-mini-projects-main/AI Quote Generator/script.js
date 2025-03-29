const getQuoteBtn = document.getElementById("getQuoteBtn");
const quoteText = document.getElementById("quoteText");

getQuoteBtn.addEventListener("click", () => {
    getQuoteBtn.classList.add("loading");
    getQuoteBtn.textContent = "Cargando...";
    getQuote();
});

// Inicialmente, elimina el estado de carga
getQuoteBtn.classList.remove("loading");
getQuoteBtn.textContent = "Obtener Frase";

function getQuote() {
    fetch("https://chiquitadas.es/api/quotes/random")
        .then((response) => response.json())
        .then((data) => {
            console.log("Respuesta completa de la API:", data); // Depuración
            if (data && data.message) {
                quoteText.innerHTML = `"${data.message}"`;
            } else {
                quoteText.innerHTML = "No se pudo obtener una frase válida.";
            }
            getQuoteBtn.classList.remove("loading");
            getQuoteBtn.textContent = "Obtener Frase";
        })
        .catch((error) => {
            console.error("Error al obtener la frase:", error);
            quoteText.innerHTML = "No se pudo obtener una frase. Inténtalo de nuevo más tarde.";
            getQuoteBtn.classList.remove("loading");
            getQuoteBtn.textContent = "Obtener Frase";
        });
}
