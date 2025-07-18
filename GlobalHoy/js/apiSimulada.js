// apiSimulada.js - Ahora se conecta a tu propio servidor proxy

// La API_KEY ya no va aquí, se maneja en el servidor

// Función para obtener noticias de tu servidor proxy
async function obtenerNoticiasDesdeAPI(categoria = 'general', query = '') {
  let url = `/api/noticias?`; // Apunta a tu propio servidor

  if (query) {
    url += `q=${encodeURIComponent(query)}`;
  } else {
    url += `category=${encodeURIComponent(categoria)}`;
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
      console.error('Error del proxy de noticias:', data.message || data.error);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener noticias del proxy:', error);
    return [];
  }
}

// Simula la obtención de las noticias más relevantes del día (ahora usa el proxy)
async function obtenerNoticiasDiarias() {
  return obtenerNoticiasDesdeAPI('general', 'noticias destacadas'); // Puedes ajustar la query
}

// La función cargarNoticiasAPI ya no es necesaria aquí, main.js la maneja