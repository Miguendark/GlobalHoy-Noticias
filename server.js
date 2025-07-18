require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const path = require('path');
const cors = require('cors'); // Necesario para permitir solicitudes desde tu frontend

const app = express();
const port = process.env.PORT || 3000; // Usa el puerto de entorno o 3000

app.use(cors()); // Habilita CORS para todas las rutas

// Define el directorio base para los archivos públicos (CSS, JS, imágenes, etc.)
const publicDir = path.join(__dirname, 'GlobalHoy');
app.use(express.static(publicDir));

// Ruta principal que sirve el index.html desde la carpeta html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'GlobalHoy', 'html', 'index.html'));
});

// Nueva ruta de proxy para NewsAPI
app.get('/api/noticias', async (req, res) => {
  const { category, q } = req.query; // Obtiene los parámetros de la URL
  const NEWS_API_KEY = process.env.NEWS_API_KEY; // Obtiene la clave de API de las variables de entorno

  if (!NEWS_API_KEY) {
    return res.status(500).json({ error: 'NEWS_API_KEY no configurada en el servidor.' });
  }

  let url;
  if (q) {
    url = `https://newsapi.org/v2/everything?q=${q}&language=es&sortBy=relevancy&apiKey=${NEWS_API_KEY}`;
  } else if (category) {
    url = `https://newsapi.org/v2/top-headlines?category=${category}&language=es&apiKey=${NEWS_API_KEY}`;
  } else {
    // Por defecto, si no hay categoría ni query, busca noticias generales
    url = `https://newsapi.org/v2/top-headlines?language=es&apiKey=${NEWS_API_KEY}`;
  }

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();
    res.json(data); // Envía la respuesta de la API directamente al frontend
  } catch (error) {
    console.error('Error al proxy NewsAPI:', error);
    res.status(500).json({ error: 'Error al obtener noticias de la API externa.' });
  }
});


// Redirige las solicitudes de páginas (ej: /nacional) a su archivo .html correspondiente
app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  // Comprueba si existe un archivo .html con ese nombre
  const filePath = path.join(__dirname, 'GlobalHoy', 'html', `${page}.html`);

  res.sendFile(filePath, (err) => {
    // Si el archivo no se encuentra, pasa a la siguiente ruta (o muestra un 404)
    if (err) {
      next();
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});