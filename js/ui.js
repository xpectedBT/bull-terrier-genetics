/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */

let lang = localStorage.getItem('btLang') || 'en';

/* ══════════════════════════════════════════
   UI TEXT (shared across pages)
══════════════════════════════════════════ */

const UI = {
  en: {
    navGenetics: 'Colour genetics',
    navLitter: 'Simulate a litter',
    navReverse: 'Identify genotype',

    eyebrow: 'Genotype Lookup · Coat Colour',
    title: 'Bull Terrier tools',
    desc: 'Explore coat colour genetics and genotype predictions.',

    footer: 'Based on Colour in Bull Terriers – Tracey Butchart (2009).'
  },
  fr: {
    navGenetics: 'Génétique des couleurs',
    navLitter: 'Simuler une portée',
    navReverse: 'Identifier le génotype',

    eyebrow: 'Recherche de génotype · Couleur de robe',
    title: 'Outils Bull Terrier',
    desc: 'Explorez la génétique des couleurs et les génotypes.',

    footer: 'D’après Colour in Bull Terriers – Tracey Butchart (2009).'
  }
};

/* ══════════════════════════════════════════
   HELPERS (SAFE DOM ACCESS)
══════════════════════════════════════════ */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function toggleClass(id, className, condition) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle(className, condition);
}

/* ══════════════════════════════════════════
   LANGUAGE
══════════════════════════════════════════ */

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem('btLang', newLang);

  toggleClass('btn-en', 'active', newLang === 'en');
  toggleClass('btn-fr', 'active', newLang === 'fr');

  document.documentElement.lang = newLang;

  renderUI();
}

/* ══════════════════════════════════════════
   RENDER GLOBAL UI
══════════════════════════════════════════ */

function renderUI() {
  const ui = UI[lang];

  // NAV
  setText('nav-genetics', ui.navGenetics);
  setText('nav-litter', ui.navLitter);
  setText('nav-reverse', ui.navReverse);

  // HEADER (if exists)
  setText('hdr-eyebrow', ui.eyebrow);
  setText('hdr-title', ui.title);
  setText('hdr-desc', ui.desc);

  // FOOTER
  setText('footer-ref', ui.footer);

  // 🔌 Hook for page-specific scripts
  if (typeof window.renderPage === 'function') {
    window.renderPage();
  }
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  toggleClass('btn-en', 'active', lang === 'en');
  toggleClass('btn-fr', 'active', lang === 'fr');

  document.documentElement.lang = lang;

  renderUI();
});
