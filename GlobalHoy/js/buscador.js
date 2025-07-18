// buscador.js

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();

  // Seleccionar todas las noticias en la página
  const newsItems = document.querySelectorAll(".news-list .news-item");

  newsItems.forEach((item) => {
    const title = item.querySelector("h3")?.textContent.toLowerCase() || "";
    const summary = item.querySelector("p")?.textContent.toLowerCase() || "";

    if (title.includes(query) || summary.includes(query)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});
