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

// apiSimulada.js - Ahora se conecta a la Netlify Function y limita el número de noticias

// Función para obtener noticias de tu Netlify Function
async function obtenerNoticiasDesdeAPI(categoria = 'general', query = '', pageSize = 10) { // Cambiado a 10
  let url = `/.netlify/functions/news-proxy?`; // Apunta a la Netlify Function

  // Mapear categorías amigables a categorías o consultas de NewsAPI
  let newsApiCategory = '';
  let newsApiQuery = '';

  switch (categoria.toLowerCase()) {
    case 'tecnología':
      newsApiCategory = 'technology';
      break;
    case 'deportes':
      newsApiCategory = 'sports';
      break;
    case 'internacional':
      newsApiQuery = 'noticias internacionales'; // Usar consulta para búsqueda más amplia
      break;
    case 'nacional':
      newsApiQuery = 'noticias nacionales'; // Usar consulta para búsqueda más amplia
      break;
    case 'cultura':
      newsApiQuery = 'cultura';
      break;
    case 'opinión':
      newsApiQuery = 'opinión';
      break;
    case 'general': // Para noticias diarias o por defecto
      newsApiCategory = 'general';
      break;
    default:
      newsApiQuery = categoria; // Si no hay mapeo específico, usar la categoría como consulta
  }

  // Si se pasó una consulta específica, tiene prioridad
  if (query) {
    newsApiQuery = query;
  }

  if (newsApiQuery) {
    url += `q=${encodeURIComponent(newsApiQuery)}`;
  } else if (newsApiCategory) {
    url += `category=${encodeURIComponent(newsApiCategory)}`;
  }

  // Añadir el parámetro pageSize
  url += `&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      // Mapear los artículos al formato que tu frontend espera
      return data.articles.map(article => ({
        titulo: article.title,
        resumen: article.description,
        imagen: article.urlToImage || 'https://via.placeholder.com/150', // Imagen por defecto si no hay
        enlace: article.url,
      }));
    } else {
      console.error('Error de la Netlify Function:', data.message || data.error);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener noticias de la Netlify Function:', error);
    return [];
  }
}

// Simula la obtención de las noticias más relevantes del día (ahora usa la Netlify Function)
async function obtenerNoticiasDiarias() {
  return obtenerNoticiasDesdeAPI('general', 'noticias destacadas', 10); // Limitar a 10 noticias diarias
}

// La función cargarNoticiasAPI ya no es necesaria aquí, main.js la maneja

// main.js

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
        <h3><a href="${noticia.enlace || '#'}" target="_blank" rel="noopener noreferrer">${noticia.titulo}</a></h3>
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
      if (contenedor.children.length > 0) return; // No cargar si ya hay noticias

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

// tiempoReal.js

// Simula la actualización de noticias cada 30 segundos
const actualizarInterval = 30000; // 30 segundos

function obtenerNoticiasTiempoReal() {
  // Aquí iría llamada a API real o WebSocket
  // Por ahora simulamos una noticia nueva
  const noticiaNueva = {
    titulo: "Actualización en tiempo real: Evento destacado!",
    resumen: "Este es un resumen actualizado que llegó hace poco.",
    imagen: "https://via.placeholder.com/150", // Usar placeholder
    enlace: "#",
  };

  // Agregar la noticia al inicio de la sección Internacional como ejemplo
  const contenedor = document.getElementById("internacionalNews");
  if (!contenedor) return;

  const articulo = document.createElement("article");
  articulo.classList.add("news-item", "reveal");
  articulo.innerHTML = `
    <img src="${noticiaNueva.imagen}" alt="${noticiaNueva.titulo}" />
    <div class="news-content">
      <h3><a href="${noticiaNueva.enlace}">${noticiaNueva.titulo}</a></h3>
      <p>${noticiaNueva.resumen}</p>
    </div>
  `;

  contenedor.insertBefore(articulo, contenedor.firstChild);

  // Opcional: Limitar cantidad de noticias mostradas
  if (contenedor.childElementCount > 10) {
    contenedor.removeChild(contenedor.lastChild);
  }
}

setInterval(obtenerNoticiasTiempoReal, actualizarInterval);

// Ejecutar la primera vez al cargar
window.addEventListener("load", obtenerNoticiasTiempoReal);

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
      articulo.innerHTML = `
        <img src="${noticia.imagen}" alt="${noticia.titulo}" />
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

// anuncios.js

// Simula la carga de anuncios en cada espacio
const espacios = [
  "banner-top",
  "anuncio-internacional",
  "anuncio-nacional",
  "anuncio-tecnologia",
  "anuncio-deportes",
  "anuncio-cultura",
  "anuncio-opinion",
  "footer-anuncio"
];

espacios.forEach((id) => {
  const contenedor = document.getElementById(id);
  if (!contenedor) return;

  // Aquí podrías cargar anuncios reales vía API o script
  // Por ahora solo mostramos texto y un botón simulado
  contenedor.innerHTML = `
    <p>Espacio publicitario - GlobalHoy</p>
    <button class="btn-cerrar-anuncio" aria-label="Cerrar anuncio">×</button>
  `;

  const btnCerrar = contenedor.querySelector(".btn-cerrar-anuncio");
  btnCerrar.addEventListener("click", () => {
    contenedor.style.display = "none";
  });
});

// Para anuncios fijos móviles (si los activas)
// Puedes agregar lógica aquí para mostrarlos o esconderlos
