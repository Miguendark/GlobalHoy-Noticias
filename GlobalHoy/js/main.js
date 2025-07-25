document.addEventListener('DOMContentLoaded', () => {
  const langEnBtn = document.getElementById('lang-en');
  const langEsBtn = document.getElementById('lang-es');

  const setLanguage = (lang) => {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-translate-key]').forEach(element => {
      const key = element.getAttribute('data-translate-key');
      if (translations[lang] && translations[lang][key]) {
        if (element.tagName === 'INPUT' && element.type === 'search') {
          element.placeholder = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });

    // Vuelve a cargar las noticias en el idioma seleccionado
    cargarNoticiasDiarias();
    cargarNoticiasPorCategoria();
    loadTrendingNews();
  };

  langEnBtn.addEventListener('click', () => setLanguage('en'));
  langEsBtn.addEventListener('click', () => setLanguage('es'));

  // Set language on initial load
  const savedLang = localStorage.getItem('language') || 'es';
  setLanguage(savedLang);
});