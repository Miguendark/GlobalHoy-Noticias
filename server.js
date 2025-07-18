const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Define el directorio base para los archivos públicos (CSS, JS, imágenes, etc.)
const publicDir = path.join(__dirname, 'GlobalHoy');
app.use(express.static(publicDir));

// Ruta principal que sirve el index.html desde la carpeta html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'GlobalHoy', 'html', 'index.html'));
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
