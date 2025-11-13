// Espera a que el documento esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene referencias al botón y al párrafo
  const boton = document.getElementById("tirar");
  const resultado = document.getElementById("resultado");

  // Cuando el botón se clicke, genera un número aleatorio del 1 al 6
  boton.addEventListener("click", () => {
    const numero = Math.floor(Math.random() * 6) + 1;
    resultado.textContent = `🎲 Salió el número ${numero}`;
  });
});
