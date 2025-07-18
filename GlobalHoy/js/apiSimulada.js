// apiSimulada.js - Ahora se conecta a la Netlify Function y limita el número de noticias

// Función para obtener noticias de tu Netlify Function
async function obtenerNoticiasDesdeAPI(categoria = 'general', query = '', pageSize = 5) { // Añadido pageSize
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
  return obtenerNoticiasDesdeAPI('general', 'noticias destacadas', 5); // Limitar a 5 noticias diarias
}

// La función cargarNoticiasAPI ya no es necesaria aquí, main.js la maneja