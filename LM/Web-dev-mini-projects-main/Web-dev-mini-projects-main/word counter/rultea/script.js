// Referencias a elementos en el DOM
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

// Define los rangos de cada sector (min y max en grados) y su premio
// Estos valores son de ejemplo: cámbialos según tu imagen real.
const sectors = [
  { min: 0,   max: 45,  prize: "1 Million €" },
  { min: 45,  max: 135, prize: "MUERTE" },
  { min: 135, max: 190, prize: "2 Billones €" },
  { min: 190, max: 230, prize: "lamnbo" },
  { min: 230, max: 270, prize: "1 bitcoin" },
  { min: 270, max: 315, prize: "0 €" },
  { min: 315, max: 360, prize: "500K" }
];

// Ángulo acumulado (cada giro se suma al anterior)
let currentRotation = 0;

// Al hacer clic en "Girar"
spinBtn.addEventListener("click", () => {
  // Generamos un giro aleatorio grande (ej. 2000 - 5000 grados)
  const randomRotation = Math.floor(Math.random() * 3000) + 2000;
  
  // Sumamos ese giro al ángulo acumulado
  currentRotation += randomRotation;
  
  // Aplicamos la rotación a la ruleta
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  // Después de 4s (la duración de la transición en CSS), calculamos el resultado
  setTimeout(() => {
    // Normalizamos el ángulo a [0..360)
    let normalizedAngle = currentRotation % 360;
    
    // Ajusta el offset según la posición de tu flecha
    // (90 si está a la derecha, 180 si está abajo, etc.)
    const offset = 90;  
    normalizedAngle = (normalizedAngle + offset) % 360;

    // Buscamos en qué rango cae el ángulo
    let finalPrize = "Desconocido";
    for (const sector of sectors) {
      if (normalizedAngle >= sector.min && normalizedAngle < sector.max) {
        finalPrize = sector.prize;
        break;
      }
    }

    console.log("Ángulo normalizado: " + normalizedAngle);
    // Mostramos el resultado
    result.textContent = `¡Felicidades! Obtuviste: ${finalPrize}`;
  }, 4000);
});
