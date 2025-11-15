document.addEventListener("DOMContentLoaded", () => {

  const boton = document.getElementById("tirar");
  const selectElement = document.querySelector("select");
  let select = Number(selectElement.value);
  const resultado = document.getElementById("resultado");
  const ctx = document.getElementById("myChart");

  // Generamos tantos contadores como dados se hayan seleccionado
  function crearContadores(n) {
    return Array.from({ length: n }, (_, i) => ({
      value: i + 1,
      total: 0
    }));
  }

  let contadores = crearContadores(select);

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: contadores.map(c => c.value.toString()),
      datasets: [{
        label: "Estadísticas",
        data: contadores.map(c => c.total),
        borderWidth: 1
      }]
    }
  });

  // Función para actualizar gráfico
  function actualizarGrafico() {
    const valores = contadores.map(c => c.value.toString());
    const totales = contadores.map(c => c.total);

    myChart.data.labels.splice(0, myChart.data.labels.length, ...valores);
    myChart.data.datasets[0].data.splice(0, myChart.data.datasets[0].data.length, ...totales);

    myChart.update();
  }

  // Tiramos el dado y mostramos el resultado, sumamos el total y actualizamos el grafico
  boton.addEventListener("click", () => {
    const numero = Math.floor(Math.random() * select) + 1;
    resultado.textContent = `🎲 ${numero}`;

   // if (numero == select) resultado.textContent = `CRÍTICO`;

    contadores[numero - 1].total++;
    actualizarGrafico();
  });

  // Si cambia el select por otro tipo de dado
  selectElement.addEventListener("change", () => {
  select = Number(selectElement.value);
    contadores = crearContadores(select);
    actualizarGrafico();
  });
});
