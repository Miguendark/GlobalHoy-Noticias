// loader.js
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// scrollReveal.js

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Ejecutar al cargar para los elementos visibles inicialmente
window.addEventListener("load", revealOnScroll);

// apiSimulada.js - Ahora usa NewsAPI para obtener noticias

const NEWSAPI_KEY = 'b2bfab8186a94cb1880da036fcc78013'; // Tu clave API de NewsAPI
const NEWSAPI_BASE_URL_HEADLINES = 'https://newsapi.org/v2/top-headlines';
const NEWSAPI_BASE_URL_EVERYTHING = 'https://newsapi.org/v2/everything';

// Función para obtener noticias de NewsAPI
async function obtenerNoticiasDesdeAPI(categoria = 'general', query = '', pageSize = 10) {
  let url;
  let params = `apiKey=${NEWSAPI_KEY}&language=en`; // Idioma inglés

  // Mapear categorías amigables a categorías de NewsAPI
  const newsApiCategoryMap = {
    'general': 'general',
    'tecnologia': 'technology',
    'deportes': 'sports',
    'internacional': 'general', // NewsAPI doesn't have 'international' category, use general
    'nacional': 'general', // NewsAPI doesn't have 'national' category, use general
    'cultura': 'entertainment', // Closest category
    'opinion': 'general', // No direct 'opinion' category
  };

  if (query) {
    url = NEWSAPI_BASE_URL_EVERYTHING;
    params += `&q=${encodeURIComponent(query)}`;
  } else {
    url = NEWSAPI_BASE_URL_HEADLINES;
    const mappedCategory = newsApiCategoryMap[categoria.toLowerCase()] || 'general';
    params += `&category=${mappedCategory}`;
  }

  params += `&pageSize=${pageSize}`;

  try {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    if (data.status === 'ok') {
      return data.articles.map(article => ({
        titulo: article.title,
        resumen: article.description,
        imagen: article.urlToImage || 'https://placehold.co/400x230?text=No+Image', // Imagen por defecto si no hay
        enlace: article.url, // Enlace a la noticia original
        contenido_completo: article.content || article.description // Usar content o description para la modal
      }));
    } else {
      console.error('Error de NewsAPI:', data.message || data.code);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener noticias de NewsAPI:', error);
    return [];
  }
}

// Simula la obtención de las noticias más relevantes del día (ahora usa NewsAPI)
async function obtenerNoticiasDiarias() {
  return obtenerNoticiasDesdeAPI('general', '', 10); // Obtener 10 noticias generales
}

// La función cargarNoticiasAPI ya no es necesaria aquí, main.js la maneja

// main.js

const newsPerPage = 10; // Número de noticias a cargar por vez
const currentPages = { // Objeto para llevar el control de la página actual por categoría
  general: 0,
  internacional: 0,
  nacional: 0,
  tecnologia: 0,
  deportes: 0,
  cultura: 0,
  opinion: 0,
};

document.addEventListener("DOMContentLoaded", () => {
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
        <h3><a class="news-link" href="${noticia.enlace || '#'}" target="_blank" rel="noopener noreferrer">${noticia.titulo}</a></h3>
        <p>${noticia.informacion || noticia.resumen}</p>
      </div>
    `;

    // --- Lógica para el anuncio Popunder y retardo de navegación ---
    const newsLink = articulo.querySelector('.news-link');
    if (newsLink) {
      newsLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir la navegación inmediata del enlace

        const targetUrl = noticia.enlace; // La URL original de la noticia

        // Mostrar el Popunder (si el script externo lo maneja al clic global)
        // y luego abrir la modal después de un retardo
        setTimeout(() => {
          // Llenar y mostrar la modal
          document.getElementById('modal-title').textContent = noticia.titulo;
          document.getElementById('modal-image').src = noticia.imagen;
          document.getElementById('modal-image').alt = noticia.titulo;
          document.getElementById('modal-description').textContent = noticia.resumen;
          document.getElementById('modal-full-content').textContent = noticia.contenido_completo || noticia.resumen; // Mostrar contenido completo o resumen
          document.getElementById('modal-link').href = targetUrl;
          document.getElementById('news-modal').style.display = 'block';
        }, 5000); // Retraso de 5 segundos para el Popunder antes de mostrar la modal
      });
    }
    // --- Fin de la lógica para el anuncio Popunder ---

    return articulo;
  }

  // Lógica para cerrar la modal
  const newsModal = document.getElementById('news-modal');
  const closeButton = document.querySelector('.news-modal .close-button');

  if (newsModal && closeButton) {
    closeButton.addEventListener('click', () => {
      newsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target == newsModal) {
        newsModal.style.display = 'none';
      }
    });
  }

  // Función genérica para cargar noticias con paginación
  async function cargarNoticiasPaginadas(categoria, contenedorId, isInitialLoad = true) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    const loadMoreButton = document.getElementById(`load-more-${categoria}-news`);

    if (isInitialLoad) {
      contenedor.innerHTML = "<p>Cargando noticias...</p>";
      currentPages[categoria] = 0; // Resetear página al cargar inicialmente
    }

    const startIndex = currentPages[categoria] * newsPerPage;
    const endIndex = startIndex + newsPerPage;

    const noticias = await obtenerNoticiasDesdeAPI(categoria, '', endIndex); // Obtener hasta el final de la página actual

    if (isInitialLoad) {
      contenedor.innerHTML = ""; // Limpiar solo en la carga inicial
    }

    const noticiasParaMostrar = noticias.slice(startIndex, endIndex);

    if (noticiasParaMostrar.length === 0 && isInitialLoad) {
      contenedor.innerHTML = "<p>No hay noticias disponibles en esta categoría.</p>";
      if (loadMoreButton) loadMoreButton.style.display = "none";
      return;
    } else if (noticiasParaMostrar.length === 0) {
      // No hay más noticias para cargar
      if (loadMoreButton) loadMoreButton.style.display = "none";
      return;
    }

    noticiasParaMostrar.forEach(noticia => {
      const articulo = crearArticuloNoticia(noticia);
      contenedor.appendChild(articulo);
    });

    currentPages[categoria]++;

    // Mostrar/ocultar botón "Cargar Más" si hay más noticias
    if (loadMoreButton) {
      if (noticias.length > currentPages[categoria] * newsPerPage) {
        loadMoreButton.style.display = "block";
      } else {
        loadMoreButton.style.display = "none";
      }
    }
  }

  // Cargar noticias diarias en la sección principal
  async function cargarNoticiasDiarias() {
    await cargarNoticiasPaginadas('general', 'daily-news-container', true);
  }

  // Cargar noticias por categoría en las páginas correspondientes
  const contenedores = document.querySelectorAll(".news-list");
  if (contenedores.length > 0) {
    const mapaIdCategoria = {
      internacionalNews: "internacional",
      nacionalNews: "nacional",
      tecnologiaNews: "tecnologia",
      deportesNews: "deportes",
      culturaNews: "cultura",
      opinionNews: "opinion",
    };

    contenedores.forEach(async (contenedor) => {
      if (contenedor.children.length > 0) return; // No cargar si ya hay noticias

      const id = contenedor.id;
      const categoria = mapaIdCategoria[id];
      if (!categoria) return;

      await cargarNoticiasPaginadas(categoria, id, true);
    });
  }

  // Event listener para el botón "Cargar Más Noticias" de la sección diaria
  const loadMoreDailyBtn = document.getElementById('load-more-daily-news');
  if (loadMoreDailyBtn) {
    loadMoreDailyBtn.addEventListener('click', () => {
      cargarNoticiasPaginadas('general', 'daily-news-container', false);
    });
  }

  // Prevenir que los enlaces de navegación activen anuncios de Enlace Directo/Popunder
  const navLinks = document.querySelectorAll('.main-nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir la navegación por defecto
      const targetUrl = link.href;
      window.location.href = targetUrl; // Redirigir manualmente
    });
  });

  // Cargar todo al iniciar
  cargarNoticiasDiarias();
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mainNav = document.getElementById('main-nav');

  if (hamburgerMenu && mainNav) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('is-active');
      mainNav.classList.toggle('is-active');
    });
  }
});

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

// tiempoReal.js - Eliminado para gestión manual de noticias

// redes.js

// Abrir ventana para compartir enlace en redes sociales
function compartirEnRedSocial(url) {
  window.open(url, "_blank", "width=600,height=400,scrollbars=no");
}

// Eventos para los iconos sociales (suponiendo que tienen estos ids)
document.addEventListener("DOMContentLoaded", () => {
  const urlPagina = encodeURIComponent(window.location.href);
  const tituloPagina = encodeURIComponent(document.title);

  const fbBtn = document.querySelector('a[aria-label="Facebook"]');
  const twBtn = document.querySelector('a[aria-label="Twitter"]');
  const igBtn = document.querySelector('a[aria-label="Instagram"]');

  if (fbBtn) {
    fbBtn.addEventListener("click", (e) => {
      e.preventDefault();
      compartirEnRedSocial(
        `https://www.facebook.com/sharer/sharer.php?u=${urlPagina}`
      );
    });
  }

  if (twBtn) {
    twBtn.addEventListener("click", (e) => {
      e.preventDefault();
      compartirEnRedSocial(
        `https://twitter.com/intent/tweet?text=${tituloPagina}&url=${urlPagina}`
      );
    });
  }

  if (igBtn) {
    // Instagram no tiene compartir directo, redirigimos al perfil o página
    igBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("https://www.instagram.com/", "_blank");
    });
  }
});

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

// irArriba.js

const btnIrArriba = document.getElementById("btnIrArriba");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnIrArriba.style.display = "block";
  } else {
    btnIrArriba.style.display = "none";
  }
});

btnIrArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// recomendados.js

document.addEventListener("DOMContentLoaded", async () => {
  const recomendadosCont = document.getElementById("recomendadosNews");
  if (!recomendadosCont) return;

  recomendadosCont.innerHTML = "<p>Cargando recomendaciones...</p>"; // Mensaje de carga

  try {
    // Obtener noticias generales para recomendaciones
    const recommendedNews = await obtenerNoticiasDesdeAPI('general', 'recommended', 6); // Obtener 6 noticias recomendadas

    recomendadosCont.innerHTML = ""; // Limpiar mensaje de carga

    if (recommendedNews.length === 0) {
      recomendadosCont.innerHTML = "<p>No hay recomendaciones de noticias disponibles.</p>";
      return;
    }

    recommendedNews.forEach((noticia) => {
      const articulo = crearArticuloNoticia(noticia);
      recomendadosCont.appendChild(articulo);
    });
  } catch (error) {
    recomendadosCont.innerHTML = "<p>Error al cargar las recomendaciones.</p>";
    console.error("Error loading recommendations:", error);
  }
});

// graficos.js

// Función para cargar Chart.js dinámicamente y luego inicializar el gráfico
function loadChartJsAndInitialize() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = () => {
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
          "996633"
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
  };
  document.body.appendChild(script);
}

// Usar IntersectionObserver para cargar Chart.js cuando la sección de gráficos sea visible
document.addEventListener("DOMContentLoaded", () => {
  const graficoSection = document.getElementById("graficos");
  if (graficoSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadChartJsAndInitialize();
          observer.unobserve(entry.target); // Dejar de observar una vez cargado
        }
      });
    }, { threshold: 0.1 }); // Cargar cuando el 10% de la sección sea visible

    observer.observe(graficoSection);
  }
});

// anuncios.js - Eliminado, ahora se usan anuncios externos

// Carga diferida de Google Tag Manager
document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-K4120GXZCS';
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-K4120GXZCS');
});
