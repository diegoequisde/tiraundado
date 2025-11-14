document.addEventListener("DOMContentLoaded", () => {

  const boton = document.getElementById("tirar");
  const select = document.querySelector("select");
  const resultado = document.getElementById("resultado");

  boton.addEventListener("click", () => {
    const caras = parseInt(select.value);
    const numero = Math.floor(Math.random() * caras) + 1;

    resultado.textContent = `🎲 ${numero}`;
  });

  
});
