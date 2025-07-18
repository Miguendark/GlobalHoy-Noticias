// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Función para crear un artículo de noticia y evitar repetición de código
  function crearArticuloNoticia(noticia) {
    const articulo = document.createElement("article");
    articulo.classList.add("news-item", "reveal");

    // Contenido del artículo
    articulo.innerHTML = `
      <img src="${noticia.imagen}" alt="${noticia.titulo}" />
      <div class="news-content">
        <h3><a href="#">${noticia.titulo}</a></h3>
        <p>${noticia.informacion || noticia.resumen}</p>
      </div>
    `;
    return articulo;
  }

  // Cargar noticias diarias en la sección principal
  async function cargarNoticiasDiarias() {
    const contenedor = document.getElementById("daily-news-container");
    if (!contenedor) return;

    contenedor.innerHTML = "<p>Cargando noticias del día...</p>";

    try {
      const noticias = await obtenerNoticiasDiarias(); // Función de apiSimulada.js
      contenedor.innerHTML = ""; // Limpiar el contenedor

      noticias.forEach(noticia => {
        const articulo = crearArticuloNoticia(noticia);
        contenedor.appendChild(articulo);
      });
    } catch (error) {
      contenedor.innerHTML = "<p>Error al cargar las noticias del día.</p>";
      console.error("Error:", error);
    }
  }

  // Cargar noticias por categoría en las páginas correspondientes
  const contenedores = document.querySelectorAll(".news-list");
  if (contenedores.length > 0) {
    const mapaIdCategoria = {
      internacionalNews: "Internacional",
      nacionalNews: "Nacional",
      tecnologiaNews: "Tecnología",
      deportesNews: "Deportes",
      culturaNews: "Cultura",
      opinionNews: "Opinión",
    };

    contenedores.forEach(async (contenedor) => {
      const id = contenedor.id;
      const categoria = mapaIdCategoria[id];
      if (!categoria) return;

      try {
        const noticias = await obtenerNoticiasDesdeAPI(categoria);
        contenedor.innerHTML = ""; // Limpiar

        noticias.forEach(noticia => {
          const articulo = crearArticuloNoticia(noticia);
          contenedor.appendChild(articulo);
        });
      } catch (error) {
        contenedor.innerHTML = `<p>Error cargando noticias de ${categoria}.</p>`;
        console.error(`Error en ${categoria}:`, error);
      }
    });
  }

  // Cargar todo al iniciar
  cargarNoticiasDiarias();
});
