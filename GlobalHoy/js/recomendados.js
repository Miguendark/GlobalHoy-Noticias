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
        <picture>
          <source srcset="https://images.weserv.nl/?url=${encodeURIComponent(noticia.imagen)}&w=400&h=230&fit=cover&q=80&output=webp" media="(max-width: 600px)">
          <source srcset="https://images.weserv.nl/?url=${encodeURIComponent(noticia.imagen)}&w=800&h=460&fit=cover&q=80&output=webp" media="(min-width: 601px)">
          <img src="https://images.weserv.nl/?url=${encodeURIComponent(noticia.imagen)}&w=400&h=230&fit=cover&q=80&output=webp" alt="${noticia.titulo}" loading="lazy" />
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
