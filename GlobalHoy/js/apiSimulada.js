// apiSimulada.js - Ahora se conecta a NewsAPI.org

const API_KEY = 'b2bfab8186a94cb1880da036fcc78013'; // Tu clave de API

// Función para obtener noticias de NewsAPI.org
async function obtenerNoticiasDesdeAPI(categoria = 'general', query = '') {
  let url;
  if (query) {
    url = `https://newsapi.org/v2/everything?q=${query}&language=es&sortBy=relevancy&apiKey=${API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?category=${categoria}&language=es&apiKey=${API_KEY}`;
  }

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
      console.error('Error de NewsAPI:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    return [];
  }
}

// Simula la obtención de las noticias más relevantes del día (ahora usa la API real)
async function obtenerNoticiasDiarias() {
  return obtenerNoticiasDesdeAPI('general', 'noticias destacadas'); // Puedes ajustar la query
}

// Esta función ya no es necesaria si main.js llama directamente a obtenerNoticiasDesdeAPI
// async function cargarNoticiasAPI(categoria, contenedorId) {
//   const contenedor = document.getElementById(contenedorId);
//   if (!contenedor) return;

//   contenedor.innerHTML = "<p>Cargando noticias...</p>";

//   try {
//     const noticias = await obtenerNoticiasDesdeAPI(categoria);
//     contenedor.innerHTML = "";

//     noticias.forEach((noticia) => {
//       const articulo = document.createElement("article");
//       articulo.classList.add("news-item", "reveal");
//       articulo.innerHTML = `
//         <img src="${noticia.imagen}" alt="${noticia.titulo}" />
//         <div class="news-content">
//           <h3><a href="${noticia.enlace}">${noticia.titulo}</a></h3>
//           <p>${noticia.resumen}</p>
//         </div>
//       `;
//       contenedor.appendChild(articulo);
//     });
//   } catch (error) {
//     contenedor.innerHTML = "<p>Error cargando noticias.</p>";
//     console.error("Error al cargar noticias:", error);
//   }
// }