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
