// apiSimulada.js

// Simula una llamada a una API REST para obtener noticias
function obtenerNoticiasDesdeAPI(categoria) {
  // URL simulada - en un proyecto real aquí va tu endpoint
  const url = `https://api.ejemplo.com/noticias?categoria=${categoria}`;

  // Por ahora simulamos con un Promise que devuelve datos
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          titulo: `Noticia simulada 1 de ${categoria}`,
          resumen: "Resumen de noticia simulada 1",
          imagen: "../img/noticias/simulado1.jpg",
          enlace: "#",
        },
        {
          titulo: `Noticia simulada 2 de ${categoria}`,
          resumen: "Resumen de noticia simulada 2",
          imagen: "../img/noticias/simulado2.jpg",
          enlace: "#",
        },
      ]);
    }, 1000); // Simula retraso de 1 segundo
  });
}

// Simula la obtención de las noticias más relevantes del día
function obtenerNoticiasDiarias() {
  return new Promise((resolve) => {
    const noticiasDiarias = [
      {
        titulo: "Avance histórico en la fusión nuclear",
        informacion: "Científicos anuncian un gran avance que podría resolver la crisis energética mundial, generando más energía de la que consume el proceso.",
        imagen: "https://cdn-images.motor.es/image/m/1320w/fotos-noticias/2022/05/avance-historico-fusion-nuclear-nueva-ley-multiplica-potencial-202287186-1653298358_1.jpg"
      },
      {
        titulo: "Nueva IA Generativa sorprende al mundo",
        informacion: "Una startup de tecnología ha lanzado una IA capaz de crear videos realistas a partir de texto, abriendo un nuevo debate sobre la creatividad y la automatización.",
        imagen: "https://www.semana.com/resizer/v2/FZRJBVAD4VDRXIJSBAW2JZBXJY.jpg?auth=6a53e9195de989c998f98825a1e5f1d60cacc2e941b6cf841206962059834f85&smart=true&quality=75&width=1280"
      },
      {
        titulo: "Descubren una nueva especie en el Amazonas",
        informacion: "Un equipo de biólogos ha identificado una nueva especie de primate en una región remota de la selva amazónica, destacando la importancia de la conservación.",
        imagen: "https://ichef.bbci.co.uk/news/1024/branded_mundo/4df7/live/d0c4ecc0-bf20-11ef-a0f2-fd81ae5962f4.jpg"
      },
      {
        titulo: "El Banco Central anuncia cambios en la política monetaria",
        informacion: "Para combatir la inflación, el Banco Central ha decidido aumentar las tasas de interés, una medida que afectará a los mercados globales.",
        imagen: "https://robertocavada.com/wp-content/uploads/2024/08/Banco-central-dominicano-1140x801-1-770x540.jpg"
      }
    ];
    // Simula un pequeño retraso como si fuera una llamada a una API
    setTimeout(() => {
      resolve(noticiasDiarias);
    }, 500);
  });
}


// Uso ejemplo: cargar noticias en un contenedor específico
async function cargarNoticiasAPI(categoria, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = "<p>Cargando noticias...</p>";

  try {
    const noticias = await obtenerNoticiasDesdeAPI(categoria);
    contenedor.innerHTML = "";

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
      contenedor.appendChild(articulo);
    });
  } catch (error) {
    contenedor.innerHTML = "<p>Error cargando noticias.</p>";
    console.error("Error al cargar noticias:", error);
  }
}

// Puedes llamar cargarNoticiasAPI('Internacional', 'internacionalNews') desde main.js o en la página
