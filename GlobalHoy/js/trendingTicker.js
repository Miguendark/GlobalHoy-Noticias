// trendingTicker.js

// Ejemplo de noticias urgentes para mostrar en el ticker
const trendingNews = [
  "Última hora: Se lanza nueva vacuna contra la gripe.",
  "Mercados internacionales al alza tras anuncio económico.",
  "Deportes: Selección nacional clasifica a torneo mundial.",
  "Tecnología: Nuevo smartphone con pantalla plegable presentado.",
  "Cultura: Festival de cine internacional inicia este fin de semana."
];

const tickerContent = document.getElementById("tickerContent");

function loadTrendingNews() {
  if (!tickerContent) return;

  // Limpiar contenido previo
  tickerContent.innerHTML = "";

  // Agregar noticias con separación
  trendingNews.forEach((news, index) => {
    const span = document.createElement("span");
    span.textContent = news;

    // Separador visual entre noticias
    if (index < trendingNews.length - 1) {
      span.textContent += "  •  ";
    }

    tickerContent.appendChild(span);
  });
}

window.addEventListener("load", loadTrendingNews);
