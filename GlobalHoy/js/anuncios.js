// anuncios.js

document.addEventListener("DOMContentLoaded", () => {
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
});
