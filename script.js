document.addEventListener("DOMContentLoaded", () => {

  const boton = document.getElementById("tirar");
  const selectElement = document.getElementById("selectDado");
  const resultado = document.getElementById("resultado");
  const ctx = document.getElementById("myChart");

  const totalUI = document.getElementById("count");
  const masRepetidoUI = document.getElementById("masRepetido");
  const porcentajeUI = document.getElementById("porcentaje");

  let select = Number(selectElement.value);

  // Crear objetos contadores
  function crearContadores(n) {
    return Array.from({ length: n }, (_, i) => ({
      value: i + 1,
      total: 0
    }));
  }

  let contadores = crearContadores(select);

  // Gráfico
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: contadores.map(c => c.value.toString()),
      datasets: [{
        label: "Tiradas por número",
        data: contadores.map(c => c.total),
        borderWidth: 1
      }]
    }
  });

  function actualizarGrafico() {
    myChart.data.datasets[0].data = contadores.map(c => c.total);
    myChart.data.labels = contadores.map(c => c.value.toString());
    myChart.update();
  }

  // Función auxiliar: total de tiradas
  function obtenerTotal() {
    return contadores.reduce((acc, c) => acc + c.total, 0);
  }

  // Función auxiliar: cara más repetida
  function obtenerMasRepetido() {
    const max = Math.max(...contadores.map(c => c.total));
    if (max === 0) return "–";
    const caras = contadores.filter(c => c.total === max).map(c => c.value);
    return caras.join(", ");
  }

  // Tirar dado
  boton.addEventListener("click", () => {
    const numero = Math.floor(Math.random() * select) + 1;

    // Mostrar resultado
    resultado.textContent = numero;
    resultado.classList.remove("pop");
    void resultado.offsetWidth;
    resultado.classList.add("pop");

    // Sumar contador
    contadores[numero - 1].total++;

    // Actualizar total
    const total = obtenerTotal();
    totalUI.textContent = total;

    // Actualizar porcentaje de esa cara
    const porcentaje = ((contadores[numero - 1].total / total) * 100).toFixed(1);
    porcentajeUI.textContent = porcentaje + "%";

    // Actualizar cara más repetida
    masRepetidoUI.textContent = obtenerMasRepetido();

    actualizarGrafico();
  });

  // Cambiar tipo de dado
  selectElement.addEventListener("change", () => {
    select = Number(selectElement.value);
    contadores = crearContadores(select);

    totalUI.textContent = "0";
    porcentajeUI.textContent = "–";
    masRepetidoUI.textContent = "–";

    actualizarGrafico();
  });

  // Toggle Modo Claro/Oscuro

const themeToggle = document.getElementById("themeToggle");

// Aplicar preferencia guardada
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

// Evento de clic
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Guardar preferencia
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
  });

});
