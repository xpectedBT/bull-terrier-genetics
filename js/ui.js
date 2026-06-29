/* ═══════════════════════════════════════
   GLOBAL STATE
═══════════════════════════════════════ */
let lang = localStorage.getItem('btLang') || 'en';

/* ═══════════════════════════════════════
   TEXT (USED ON ALL PAGES)
═══════════════════════════════════════ */
const UI = {
  en: {
    navGenetics: 'Colour genetics',
    navLitter: 'Simulate a litter',
    navReverse: 'Identify genotype',

    eyebrow: 'Genotype Lookup · Coat Colour',
    title: "Identify your dog's genotype",
    desc: 'Select the coat colour and pattern that matches your dog.',

    tagStep1: 'Step 1',
    titleStep1: 'What does your dog look like?',
    tagStep2: 'Step 2',
    titleResults: 'Possible genotypes',

    labelColoured: 'Coloured & coloured/white dogs',
    labelWhite: 'White dogs',

    emptyText: 'Select a coat colour above to see the possible genotypes.',

    offspringTitle: 'Offspring potential:',
    hint: 'These genotype options cannot always be distinguished visually.',

    footer: 'Based on Colour in Bull Terriers – Tracey Butchart (2009).'
  },

  fr: {
    navGenetics: 'Génétique des couleurs',
    navLitter: 'Simuler une portée',
    navReverse: 'Identifier le génotype',

    eyebrow: 'Recherche de génotype · Couleur de robe',
    title: 'Identifier le génotype de votre chien',
    desc: 'Sélectionnez la couleur et le patron de robe.',

    tagStep1: 'Étape 1',
    titleStep1: 'À quoi ressemble votre chien ?',
    tagStep2: 'Étape 2',
    titleResults: 'Génotypes possibles',

    labelColoured: 'Chiens colorés & colorés/blancs',
    labelWhite: 'Chiens blancs',

    emptyText: 'Sélectionnez une couleur pour voir les génotypes.',

    offspringTitle: 'Potentiel de descendance :',
    hint: 'Ces options ne peuvent pas toujours être distinguées visuellement.',

    footer: "D'après Colour in Bull Terriers – Tracey Butchart (2009)."
  }
};

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
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

  renderUI();
}

/* ═══════════════════════════════════════
   RENDER UI
═══════════════════════════════════════ */
function renderUI() {
  const ui = UI[lang];

  setText('nav-genetics', ui.navGenetics);
  setText('nav-litter', ui.navLitter);
  setText('nav-reverse', ui.navReverse);

  setText('hdr-eyebrow', ui.eyebrow);
  setText('hdr-title', ui.title);
  setText('hdr-desc', ui.desc);

  setText('card-tag-step1', ui.tagStep1);
  setText('card-title-step1', ui.titleStep1);
  setText('card-tag-step2', ui.tagStep2);
  setText('card-title-step2', ui.titleResults);
  setText('label-coloured', ui.labelColoured);
  setText('label-white', ui.labelWhite);
  setText('empty-text', ui.emptyText);

  setText('footer-ref', ui.footer);

  // call reverse.js if present
  if (window.renderPage) {
    window.renderPage();
  }
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setLang(lang);
});