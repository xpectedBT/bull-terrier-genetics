/* ══════════════════════════════════════════
   ui.js — SHARED ACROSS index.html, cross.html, reverse.html

   This file owns only what every page has in common:
   - the current language + localStorage persistence
   - the EN/FR buttons and their active state
   - the top-bar nav link text (nav-genetics / nav-litter / nav-reverse)

   Everything page-specific (headline, body content, results…) lives in
   that page's own script (genetics.js / cross.js / reverse.js), which
   must expose a single hook: window.renderPage(). ui.js calls that hook
   on load and on every language switch.
══════════════════════════════════════════ */

let lang = localStorage.getItem('btLang') || 'en';

const NAV = {
  en: {
    navGenetics: 'Colour genetics',
    navLitter:   'Simulate a litter',
    navReverse:  'Identify genotype',
  },
  fr: {
    navGenetics: 'Génétique des couleurs',
    navLitter:   'Simuler une portée',
    navReverse:  'Identifier le génotype',
  },
};

/* ═══════════════════════════════════════
   SMALL DOM HELPERS — reused by every page script
═══════════════════════════════════════ */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHTML(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function toggleClass(id, cls, cond) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle(cls, cond);
}

/* ═══════════════════════════════════════
   LANGUAGE SWITCH
═══════════════════════════════════════ */
function setLang(newLang) {
  lang = newLang;
  localStorage.setItem('btLang', newLang);

  toggleClass('btn-en', 'active', newLang === 'en');
  toggleClass('btn-fr', 'active', newLang === 'fr');
  document.documentElement.lang = newLang;

  renderNav();

  // page-specific script (genetics.js / cross.js / reverse.js) takes it from here
  if (window.renderPage) window.renderPage();
}

function renderNav() {
  const n = NAV[lang];
  setText('nav-genetics', n.navGenetics);
  setText('nav-litter', n.navLitter);
  setText('nav-reverse', n.navReverse);
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setLang(lang);
});
