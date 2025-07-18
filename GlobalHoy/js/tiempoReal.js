// tiempoReal.js

// Simula la actualización de noticias cada 30 segundos
const actualizarInterval = 30000; // 30 segundos

function obtenerNoticiasTiempoReal() {
  // Aquí iría llamada a API real o WebSocket
  // Por ahora simulamos una noticia nueva
  const noticiaNueva = {
    titulo: "Actualización en tiempo real: Evento destacado!",
    resumen: "Este es un resumen actualizado que llegó hace poco.",
    imagen: "../img/noticias/realTime.jpg",
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
