// main.js

document.addEventListener("DOMContentLoaded", () => {
  const initialLoadCount = 4; // Número de noticias a cargar inicialmente
  const loadMoreStep = 4; // Número de noticias a cargar en cada clic de "Cargar más"
  const allNewsData = {}; // Almacenar todos los datos de noticias por categoría

  // Función para crear un artículo de noticia y evitar repetición de código
  function crearArticuloNoticia(noticia) {
    const articulo = document.createElement("article");
    articulo.classList.add("news-item", "reveal");

    // Optimización de imagen con images.weserv.nl
    const imageUrl = noticia.imagen.startsWith('http') 
      ? `https://images.weserv.nl/?url=${encodeURIComponent(noticia.imagen)}&w=400&h=230&fit=cover&q=80&output=webp`
      : noticia.imagen;

    const image400 = imageUrl.replace('w=400', 'w=400');
    const image800 = imageUrl.replace('w=400', 'w=800');

    // Contenido del artículo con imagen responsiva
    articulo.innerHTML = `
      <picture>
        <source srcset="${image400}" media="(max-width: 600px)">
        <source srcset="${image800}" media="(min-width: 601px)">
        <img src="${image400}" alt="${noticia.titulo}" loading="lazy" />
      </picture>
      <div class="news-content">
        <h3><a href="${noticia.enlace || '#'}" target="_blank" rel="noopener noreferrer">${noticia.titulo}</a></h3>
        <p>${noticia.informacion || noticia.resumen}</p>
      </div>
    `;
    return articulo;
  }

  // Función para mostrar noticias y añadir botón "Cargar más"
  function displayNews(containerId, newsArray, startIndex = 0) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Eliminar botón "Cargar más" existente si lo hay
    const existingButton = container.nextElementSibling;
    if (existingButton && existingButton.classList.contains('load-more-button')) {
      existingButton.remove();
    }

    const endIndex = startIndex + loadMoreStep;
    const newsToDisplay = newsArray.slice(startIndex, endIndex);

    newsToDisplay.forEach(noticia => {
      const articulo = crearArticuloNoticia(noticia);
      container.appendChild(articulo);
    });

    // Añadir botón "Cargar más" si hay más noticias
    if (endIndex < newsArray.length) {
      const loadMoreBtn = document.createElement('button');
      loadMoreBtn.classList.add('load-more-button');
      loadMoreBtn.textContent = 'Cargar más noticias';
      loadMoreBtn.dataset.containerId = containerId;
      loadMoreBtn.dataset.nextIndex = endIndex;
      loadMoreBtn.addEventListener('click', (event) => {
        const btn = event.target;
        const currentContainerId = btn.dataset.containerId;
        const nextIndex = parseInt(btn.dataset.nextIndex);
        displayNews(currentContainerId, allNewsData[currentContainerId], nextIndex);
        btn.dataset.nextIndex = nextIndex + loadMoreStep; // Actualizar el siguiente índice para clics posteriores
        if (nextIndex + loadMoreStep >= allNewsData[currentContainerId].length) {
          btn.remove(); // Eliminar botón si todas las noticias están cargadas
        }
      });
      container.parentNode.insertBefore(loadMoreBtn, container.nextSibling);
    }
  }

  // Cargar noticias diarias en la sección principal
  async function cargarNoticiasDiarias() {
    const contenedor = document.getElementById("daily-news-container");
    if (!contenedor || contenedor.children.length > 0) return; // No cargar si ya tiene contenido

    contenedor.innerHTML = "<p>Cargando noticias del día...</p>";

    try {
      const noticias = await obtenerNoticiasDiarias(); // Función de apiSimulada.js
      contenedor.innerHTML = ""; // Limpiar el contenedor
      allNewsData["daily-news-container"] = noticias; // Almacenar todas las noticias
      displayNews("daily-news-container", noticias, 0); // Mostrar el lote inicial
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
      if (contenedor.children.length > 0) return; // No cargar si ya tiene contenido

      const id = contenedor.id;
      const categoria = mapaIdCategoria[id];
      if (!categoria) return;

      try {
        const noticias = await obtenerNoticiasDesdeAPI(categoria);
        contenedor.innerHTML = ""; // Limpiar
        allNewsData[id] = noticias; // Almacenar todas las noticias
        displayNews(id, noticias, 0); // Mostrar el lote inicial
      } catch (error) {
        contenedor.innerHTML = `<p>Error cargando noticias de ${categoria}.</p>`;
        console.error(`Error en ${categoria}:`, error);
      }
    });
  }

  // Cargar todo al iniciar
  cargarNoticiasDiarias();

  // Lógica del menú hamburguesa
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mainNav = document.getElementById('main-nav');

  if (hamburgerMenu && mainNav) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('is-active');
      mainNav.classList.toggle('is-active');
    });
  }
});
