// graficos.js

// Asegúrate de tener incluido Chart.js en tu proyecto, 
// puedes agregar en el head de index.html:
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

window.addEventListener("load", () => {
  const ctx = document.getElementById("graficoOpiniones").getContext("2d");

  const data = {
    labels: ["Internacional", "Nacional", "Tecnología", "Deportes", "Cultura", "Opinión"],
    datasets: [{
      label: "Visitas por sección (en miles)",
      data: [120, 90, 75, 100, 60, 40],
      backgroundColor: [
        "#004080",
        "#007acc",
        "#00aaff",
        "#ffaa00",
        "#cc6600",
        "#996633"
      ],
      borderWidth: 1,
      borderColor: "#fff",
      hoverOffset: 20,
    }]
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#333",
            font: { size: 14 }
          }
        },
        tooltip: {
          enabled: true
        }
      }
    }
  };

  new Chart(ctx, config);
});
