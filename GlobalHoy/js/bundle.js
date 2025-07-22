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

// apiSimulada.js - Ahora usa datos locales para las noticias

// Estructura de datos local para las noticias
const noticiasLocales = {
  general: [
    {
      titulo: "Noticia General 1: Gran Avance Científico",
      resumen: "Científicos anuncian un descubrimiento que podría cambiar el futuro de la medicina.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+1",
      enlace: "#",
    },
    {
      titulo: "Noticia General 2: Economía Global en Recuperación",
      resumen: "Los mercados financieros muestran signos de estabilidad y crecimiento.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+2",
      enlace: "#",
    },
    {
      titulo: "Noticia General 3: Evento Cultural del Año",
      resumen: "Festival de música y arte atrae a miles de visitantes.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+3",
      enlace: "#",
    },
    {
      titulo: "Noticia General 4: Innovación en Energía Renovable",
      resumen: "Nueva tecnología promete energía limpia y accesible para todos.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+4",
      enlace: "#",
    },
    {
      titulo: "Noticia General 5: Tendencias de Viaje para 2025",
      resumen: "Descubre los destinos más populares y las nuevas formas de explorar el mundo.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+5",
      enlace: "#",
    },
    {
      titulo: "Noticia General 6: Avances en Inteligencia Artificial",
      resumen: "La IA sigue sorprendiendo con sus capacidades y aplicaciones.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+6",
      enlace: "#",
    },
    {
      titulo: "Noticia General 7: Salud y Bienestar",
      resumen: "Consejos para una vida más sana y equilibrada.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+7",
      enlace: "#",
    },
    {
      titulo: "Noticia General 8: Educación del Futuro",
      resumen: "Nuevos modelos educativos se adaptan a las necesidades del siglo XXI.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+8",
      enlace: "#",
    },
    {
      titulo: "Noticia General 9: Desafíos Ambientales",
      resumen: "La lucha contra el cambio climático y la protección de la biodiversidad.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+9",
      enlace: "#",
    },
    {
      titulo: "Noticia General 10: Cultura Pop y Entretenimiento",
      resumen: "Lo último en cine, música y videojuegos.",
      imagen: "https://placehold.co/400x230?text=Noticia+General+10",
      enlace: "#",
    },
  ],
  tecnologia: [
    {
      titulo: "Tecnología 1: Nuevo Smartphone Plegable",
      resumen: "La última innovación en telefonía móvil llega al mercado.",
      imagen: "https://placehold.co/400x230?text=Tecnologia+1",
      enlace: "#",
    },
    {
      titulo: "Tecnología 2: Avances en Realidad Virtual",
      resumen: "La RV se integra cada vez más en la vida cotidiana.",
      imagen: "https://placehold.co/400x230?text=Tecnologia+2",
      enlace: "#",
    },
  ],
  deportes: [
    {
      titulo: "Deportes 1: Final de la Liga de Campeones",
      resumen: "Un partido épico que pasará a la historia del fútbol.",
      imagen: "https://placehold.co/400x230?text=Deportes+1",
      enlace: "#",
    },
    {
      titulo: "Deportes 2: Récord Mundial en Atletismo",
      resumen: "Atleta supera todas las expectativas en la pista.",
      imagen: "https://placehold.co/400x230?text=Deportes+2",
      enlace: "#",
    },
  ],
  internacional: [
    {
      titulo: "Internacional 1: Cumbre de Líderes Mundiales",
      resumen: "Decisiones clave para el futuro de las relaciones internacionales.",
      imagen: "https://placehold.co/400x230?text=Internacional+1",
      enlace: "#",
    },
    {
      titulo: "Internacional 2: Crisis Humanitaria en África",
      resumen: "Organizaciones de ayuda intensifican sus esfuerzos.",
      imagen: "https://placehold.co/400x230?text=Internacional+2",
      enlace: "#",
    },
  ],
  nacional: [
    {
      titulo: "Nacional 1: Reformas Educativas en Debate",
      resumen: "El gobierno propone cambios significativos en el sistema educativo.",
      imagen: "https://placehold.co/400x230?text=Nacional+1",
      enlace: "#",
    },
    {
      titulo: "Nacional 2: Elecciones Locales",
      resumen: "Resultados preliminares de las votaciones en varias ciudades.",
      imagen: "https://placehold.co/400x230?text=Nacional+2",
      enlace: "#",
    },
  ],
  cultura: [
    {
      titulo: "Cultura 1: Exposición de Arte Moderno",
      resumen: "Una colección impresionante que desafía las convenciones.",
      imagen: "https://placehold.co/400x230?text=Cultura+1",
      enlace: "#",
    },
    {
      titulo: "Cultura 2: Estreno de Obra de Teatro",
      resumen: "Críticas entusiastas para la nueva producción teatral.",
      imagen: "https://placehold.co/400x230?text=Cultura+2",
      enlace: "#",
    },
  ],
  opinion: [
    {
      titulo: "Opinión 1: El Futuro del Trabajo",
      resumen: "Análisis sobre cómo la tecnología está redefiniendo el mercado laboral.",
      imagen: "https://placehold.co/400x230?text=Opinion+1",
      enlace: "#",
    },
    {
      titulo: "Opinión 2: Desafíos de la Democracia",
      resumen: "Reflexiones sobre la participación ciudadana y el rol de los medios.",
      imagen: "https://placehold.co/400x230?text=Opinion+2",
      enlace: "#",
    },
  ],
};

// Función para obtener noticias de los datos locales
async function obtenerNoticiasDesdeAPI(categoria = 'general', query = '', pageSize = 10) {
  let noticiasFiltradas = [];
  const categoriaNormalizada = categoria.toLowerCase();

  // Si la categoría es 'general' o 'noticias destacadas', usamos la categoría 'general' de noticiasLocales
  if (categoriaNormalizada === 'general' || query.includes('noticias destacadas')) {
    noticiasFiltradas = noticiasLocales.general || [];
  } else {
    // Intentar obtener noticias por la categoría específica
    noticiasFiltradas = noticiasLocales[categoriaNormalizada] || [];
  }

  // Filtrar por query si existe
  if (query) {
    const queryLower = query.toLowerCase();
    noticiasFiltradas = noticiasFiltradas.filter(noticia =>
      noticia.titulo.toLowerCase().includes(queryLower) ||
      noticia.resumen.toLowerCase().includes(queryLower)
    );
  }

  // Devolver un subconjunto de noticias basado en pageSize
  return noticiasFiltradas.slice(0, pageSize);
}

// Simula la obtención de las noticias más relevantes del día (ahora usa datos locales)
async function obtenerNoticiasDiarias() {
  return obtenerNoticiasDesdeAPI('general', 'noticias destacadas', 10); // Limitar a 10 noticias diarias
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

        const targetUrl = newsLink.href;

        // El script del popunder ya está en el HTML y debería activarse
        // al hacer clic en cualquier parte del documento.
        // Aquí solo retrasamos la apertura de la URL de la noticia.

        setTimeout(() => {
          window.open(targetUrl, '_blank'); // Abrir la URL de la noticia en una nueva pestaña después del retardo
        }, 3000); // Retraso de 3 segundos (3000 milisegundos)
      });
    }
    // --- Fin de la lógica para el anuncio Popunder ---

    return articulo;
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

document.addEventListener("DOMContentLoaded", () => {
  const recomendadosCont = document.getElementById("recomendadosNews");
  if (!recomendadosCont) return;

  // Simulamos intereses guardados, por ejemplo:
  // localStorage.setItem('intereses', JSON.stringify(['Tecnología', 'Deportes']));
  let intereses = JSON.parse(localStorage.getItem("intereses")) || [];

  // Noticias de ejemplo por categoría
  const noticiasPorCategoria = {
    Tecnología: [
      {
        titulo: "Avances revolucionarios en IA",
        resumen: "Las últimas innovaciones en inteligencia artificial están transformando el mundo.",
        imagen: "https://karlobag.eu/images/upload/750px-rgjcd.jpg",
        enlace: "#",
      },
      {
        titulo: "Gadgets que debes conocer en 2025",
        resumen: "Una lista de dispositivos tecnológicos que marcarán tendencia.",
        imagen: "https://noro.mx/wp-content/uploads/2024/12/gadgets-avances-tecnologicos-2025-1-1280x720.png",
        enlace: "#",
      },
    ],
    Deportes: [
      {
        titulo: "Campeonatos internacionales próximos",
        resumen: "Calendario y previsiones para los eventos deportivos más esperados.",
        imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/IV4JPZCE35HRPBLFX426SJTAMA.jpg",
        enlace: "#",
      },
      {
        titulo: "Historias inspiradoras de atletas",
        resumen: "Conoce a los deportistas que están cambiando el juego.",
        imagen: "https://idmphsmkuxkn.compat.objectstorage.us-ashburn-1.oraclecloud.com/pandora-bucket/uploads/2023/02/marileidy-1024x576.jpg",
        enlace: "#",
      },
    ],
    // Puedes agregar más categorías y noticias...
  };

  // Si no hay intereses, mostramos recomendaciones generales
  if (intereses.length === 0) {
    intereses = Object.keys(noticiasPorCategoria);
  }

  recomendadosCont.innerHTML = "";

  intereses.forEach((categoria) => {
    const noticias = noticiasPorCategoria[categoria];
    if (!noticias) return;

    noticias.forEach((noticia) => {
      const articulo = document.createElement("article");
      articulo.classList.add("news-item", "reveal");

      // Optimización de imagen con images.weserv.nl
      const imageUrl = noticia.imagen.startsWith('http') 
        ? `https://images.weserv.nl/?url=${encodeURIComponent(noticia.imagen)}&w=400&h=230&fit=cover&q=80&output=webp`
        : `https://placehold.co/400x230?text=${encodeURIComponent(noticia.titulo)}`;

      const image400 = imageUrl.replace('w=400', 'w=400');
      const image800 = imageUrl.replace('w=400', 'w=800');

      articulo.innerHTML = `
        <picture>
          <source srcset="${image400}" media="(max-width: 600px)">
          <source srcset="${image800}" media="(min-width: 601px)">
          <img src="${image400}" alt="${noticia.titulo}" loading="lazy" />
        </picture>
        <div class="news-content">
          <h3><a href="${noticia.enlace}">${noticia.titulo}</a></h3>
          <p>${noticia.resumen}</p>
        </div>
      `;
      recomendadosCont.appendChild(articulo);
    });
  });
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
