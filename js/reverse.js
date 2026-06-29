
/* ═══════════════════════════════════════
   STATE
═══════════════════════════════════════ */
let selectedKey = null;

/* ══════════════════════════════════════════
   PHENOTYPE DATA
   Each entry: key, image, EN label, FR label,
   and all possible genotype options (from Butchart)
   with offspring note per option
══════════════════════════════════════════ */
const PHENOTYPES = [
  /* ── COLOURED ── */
  {
    key:'red-solid',
    img:'assets/BT_SolidRed.png',
    group:'coloured',
    label:{en:'Red / fawn solid', fr:'Rouge / fauve solide'},
    genotypes:[
      { code:'AyAy · kyky · sisi',
        pills:[['AyAy','A-series','Base color'],['kyky','K-series', 'Brindle layer'],['sisi','S-series', 'White layer']],
        note:{en:'Homozygous red. Can produce Red Solid, Brindle Solid, Red & White and Brindle & White depending on mate.',
              fr:'Rouge homozygote. Peut produire Rouge solide, Bringé solide, Rouge & blanc et Bringé & blanc selon le partenaire.'} },
      { code:'Ayat · kyky · sisi',
        pills:[['Ayat','A-series','Base color'],['kyky','K-series', 'Brindle layer'],['sisi','S-series', 'White layer']],
        note:{en:'Red carrying black & tan. Can also produce Black & tan, Tricolour, Black brindle offspring depending on mate.',
              fr:'Rouge porteur noir et feu. Peut aussi produire Noir et feu, Tricolore, Bringé noir selon le partenaire.'} },
    ]
  },
  {
    key:'brindle-solid',
    img:'assets/BT_SolidBrindle.png',
    group:'coloured',
    label:{en:'Brindle solid', fr:'Bringé solide'},
    genotypes:[
      { code:'AyAy · kbrkbr · sisi',
        pills:[['AyAy','A-series','Base color'],['kbrkbr','K-series'],['sisi','S-series']],
        note:{en:'True brindle on red base. Can only produce Brindle Solid and/or Brindle & White regardless of mate.',
              fr:'Bringé vrai sur base rouge. Ne peut produire que Bringé solide et/ou Bringé & blanc quel que soit le partenaire.'} },
      { code:'AyAy · kbrky · sisi',
        pills:[['AyAy','A-series'],['kbrky','K-series'],['sisi','S-series']],
        note:{en:'Brindle carrying non-brindle. Can produce Brindle Solid, Red Solid, Brindle & White or Red & White.',
              fr:'Bringé porteur non-bringé. Peut produire Bringé solide, Rouge solide, Bringé & blanc ou Rouge & blanc.'} },
      { code:'Ayat · kbrkbr · sisi',
        pills:[['Ayat','A-series'],['kbrkbr','K-series'],['sisi','S-series']],
        note:{en:'True brindle carrying black & tan. Can produce Brindle Solid, Black Brindle Solid, Brindle & White or Black Brindle & White.',
              fr:'Bringé vrai porteur noir et feu. Peut produire Bringé solide, Bringé noir solide, Bringé & blanc ou Bringé noir & blanc.'} },
      { code:'Ayat · kbrky · sisi',
        pills:[['Ayat','A-series','Base color'],['kbrky','K-series'],['sisi','S-series']],
        note:{en:'Most versatile brindle. Can produce all colours except White.',
              fr:'Bringé le plus polyvalent. Peut produire toutes les couleurs sauf Blanc.'} },
    ]
  },
  {
    key:'black-brindle-solid',
    img:'assets/BT_SolidBlackBrindle.png',
    group:'coloured',
    label:{en:'Black brindle solid', fr:'Bringé noir solide'},
    genotypes:[
      { code:'atat · kbrkbr · sisi',
        pills:[['atat','A-series','Base color'],['kbrkbr','K-series'],['sisi','S-series']],
        note:{en:'True black brindle. Can produce Brindle Solid, Black Brindle Solid, Brindle & White and Black Brindle & White.',
              fr:'Bringé noir vrai. Peut produire Bringé solide, Bringé noir solide, Bringé & blanc et Bringé noir & blanc.'} },
      { code:'atat · kbrky · sisi',
        pills:[['atat','A-series','Base color'],['kbrky','K-series'],['sisi','S-series']],
        note:{en:'Black brindle carrying non-brindle. Can produce all colours except White.',
              fr:'Bringé noir porteur non-bringé. Peut produire toutes les couleurs sauf Blanc.'} },
    ]
  },
  {
    key:'tri-solid',
    img:'assets/BT_SolidTri.png',
    group:'coloured',
    label:{en:'Black & tan solid', fr:'Noir et feu solide'},
    genotypes:[
      { code:'atat · kyky · sisi',
        pills:[['atat','A-series','Base color'],['kyky','K-series'],['sisi','S-series']],
        note:{en:'Only one genotype possible. Can produce all colours except White when bred with appropriate mates.',
              fr:'Un seul génotype possible. Peut produire toutes les couleurs sauf Blanc avec des partenaires appropriés.'} },
    ]
  },
  /* ── COLOURED & WHITE ── */
  {
    key:'red-white',
    img:'assets/BT_Red_White.png',
    group:'coloured',
    label:{en:'Red / fawn & white', fr:'Rouge / fauve & blanc'},
    genotypes:[
      { code:'AyAy · kyky · sisw',
        pills:[['AyAy','A-series'],['kyky','K-series'],['sisw','S-series']],
        note:{en:'Homozygous red, coloured & white. Can produce Red Solid, Brindle Solid, Red & White, Brindle & White and all White.',
              fr:'Rouge homozygote, coloré & blanc. Peut produire Rouge solide, Bringé solide, Rouge & blanc, Bringé & blanc et Blanc.'} },
      { code:'Ayat · kyky · sisw',
        pills:[['Ayat','A-series'],['kyky','K-series'],['sisw','S-series']],
        note:{en:'Red carrying black & tan, coloured & white. Can produce all colour options including White.',
              fr:'Rouge porteur noir et feu, coloré & blanc. Peut produire toutes les couleurs dont le Blanc.'} },
    ]
  },
  {
    key:'brindle-white',
    img:'assets/BT_Brindle_White.png',
    group:'coloured',
    label:{en:'Brindle & white', fr:'Bringé & blanc'},
    genotypes:[
      { code:'AyAy · kbrkbr · sisw',
        pills:[['AyAy','A-series'],['kbrkbr','K-series'],['sisw','S-series']],
        note:{en:'True brindle, coloured & white. Can only produce Brindle Solid, Brindle & White and all White.',
              fr:'Bringé vrai, coloré & blanc. Ne peut produire que Bringé solide, Bringé & blanc et Blanc.'} },
      { code:'AyAy · kbrky · sisw',
        pills:[['AyAy','A-series','Base color'],['kbrky','K-series'],['sisw','S-series']],
        note:{en:'Brindle carrying non-brindle, coloured & white. Can produce Brindle Solid, Red Solid, Brindle & White, Red & White or all White.',
              fr:'Bringé porteur non-bringé, coloré & blanc. Peut produire Bringé solide, Rouge solide, Bringé & blanc, Rouge & blanc ou Blanc.'} },
      { code:'Ayat · kbrkbr · sisw',
        pills:[['Ayat','A-series','Base color'],['kbrkbr','K-series'],['sisw','S-series']],
        note:{en:'True brindle carrying black & tan, coloured & white. Can produce Brindle Solid, Black Brindle Solid, Brindle & White, Black Brindle & White and all White.',
              fr:'Bringé vrai porteur noir et feu, coloré & blanc. Peut produire Bringé solide, Bringé noir solide, Bringé & blanc, Bringé noir & blanc et Blanc.'} },
      { code:'Ayat · kbrky · sisw',
        pills:[['Ayat','A-series','Base color'],['kbrky','K-series'],['sisw','S-series']],
        note:{en:'Most versatile brindle & white. Can produce all colour options including all White.',
              fr:'Bringé & blanc le plus polyvalent. Peut produire toutes les couleurs dont le Blanc.'} },
    ]
  },
  {
    key:'black-brindle-white',
    img:'assets/BT_BlackBrindle.png',
    group:'coloured',
    label:{en:'Black brindle & white', fr:'Bringé noir & blanc'},
    genotypes:[
      { code:'atat · kbrkbr · sisw',
        pills:[['atat','A-series','Base color'],['kbrkbr','K-series'],['sisw','S-series']],
        note:{en:'True black brindle, coloured & white. Can produce Brindle Solid, Black Brindle Solid, Brindle & White, Black Brindle & White and all White.',
              fr:'Bringé noir vrai, coloré & blanc. Peut produire Bringé solide, Bringé noir solide, Bringé & blanc, Bringé noir & blanc et Blanc.'} },
      { code:'atat · kbrky · sisw',
        pills:[['atat','A-series'],['kbrky','K-series'],['sisw','S-series']],
        note:{en:'Black brindle carrying non-brindle, coloured & white. Can produce all colour options including all White.',
              fr:'Bringé noir porteur non-bringé, coloré & blanc. Peut produire toutes les couleurs dont le Blanc.'} },
    ]
  },
  {
    key:'tri-white',
    img:'assets/BT_Tri.png',
    group:'coloured',
    label:{en:'Tricolour & white', fr:'Tricolore & blanc'},
    genotypes:[
      { code:'atat · kyky · sisw',
        pills:[['atat','A-series','Base color'],['kyky','K-series'],['sisw','S-series']],
        note:{en:'Only one genotype possible. Can produce all colour options including all White.',
              fr:'Un seul génotype possible. Peut produire toutes les couleurs dont le Blanc.'} },
    ]
  },
  /* ── WHITE ── */
  {
    key:'white-red',
    img:'assets/BT_white_CarRed.png',
    group:'white',
    label:{en:'White (carries red)', fr:'Blanc (porteur rouge)'},
    genotypes:[
      { code:'AyAy · kyky · swsw',
        pills:[['AyAy','A-series','Base color'],['kyky','K-series'],['swsw','S-series']],
        note:{en:'White carrying homozygous red. Can produce White, Red & White and Brindle & White depending on mate.',
              fr:'Blanc porteur rouge homozygote. Peut produire Blanc, Rouge & blanc et Bringé & blanc selon le partenaire.'} },
      { code:'Ayat · kyky · swsw',
        pills:[['Ayat','A-series','Base color'],['kyky','K-series'],['swsw','S-series']],
        note:{en:'White carrying red and black & tan. Can produce White, Red & White, Brindle & White, Tricolour and Black Brindle & White.',
              fr:'Blanc porteur rouge et noir et feu. Peut produire Blanc, Rouge & blanc, Bringé & blanc, Tricolore et Bringé noir & blanc.'} },
    ]
  },
  {
    key:'white-brindle',
    img:'assets/BT_white_CarBrindle.png',
    group:'white',
    label:{en:'White (carries brindle)', fr:'Blanc (porteur bringé)'},
    genotypes:[
      { code:'AyAy · kbrkbr · swsw',
        pills:[['AyAy','A-series','Base color'],['kbrkbr','K-series'],['swsw','S-series']],
        note:{en:'White, true brindle. Can only produce White and/or Brindle & White regardless of mate.',
              fr:'Blanc, bringé vrai. Ne peut produire que Blanc et/ou Bringé & blanc quel que soit le partenaire.'} },
      { code:'AyAy · kbrky · swsw',
        pills:[['AyAy','A-series','Base color'],['kbrky','K-series'],['swsw','S-series']],
        note:{en:'White carrying brindle and non-brindle. Can produce White, Brindle & White and Red & White.',
              fr:'Blanc porteur bringé et non-bringé. Peut produire Blanc, Bringé & blanc et Rouge & blanc.'} },
      { code:'Ayat · kbrkbr · swsw',
        pills:[['Ayat','A-series','Base color'],['kbrkbr','K-series'],['swsw','S-series']],
        note:{en:'White, true brindle carrying black & tan. Can produce White, Brindle & White and Black Brindle & White.',
              fr:'Blanc, bringé vrai porteur noir et feu. Peut produire Blanc, Bringé & blanc et Bringé noir & blanc.'} },
      { code:'Ayat · kbrky · swsw',
        pills:[['Ayat','A-series','Base color'],['kbrky','K-series'],['swsw','S-series']],
        note:{en:'White carrying all options. Can produce all coloured & white options plus all White puppies.',
              fr:'Blanc porteur de toutes les options. Peut produire toutes les options coloré & blanc plus Blanc.'} },
    ]
  },
  {
    key:'white-black-brindle',
    img:'assets/BT_white_CarBlackBrindle.png',
    group:'white',
    label:{en:'White (carries black brindle)', fr:'Blanc (porteur bringé noir)'},
    genotypes:[
      { code:'atat · kbrkbr · swsw',
        pills:[['atat','A-series'],['kbrkbr','K-series'],['swsw','S-series']],
        note:{en:'White, true black brindle. Can produce White, Brindle & White or Black Brindle & White depending on mate.',
              fr:'Blanc, bringé noir vrai. Peut produire Blanc, Bringé & blanc ou Bringé noir & blanc selon le partenaire.'} },
      { code:'atat · kbrky · swsw',
        pills:[['atat','A-series'],['kbrky','K-series'],['swsw','S-series']],
        note:{en:'White carrying black brindle and non-brindle. Can produce all coloured & white options plus all White.',
              fr:'Blanc porteur bringé noir et non-bringé. Peut produire toutes les options coloré & blanc plus Blanc.'} },
    ]
  },
  {
    key:'white-tri',
    img:'assets/BT_white_CarTri.png',
    group:'white',
    label:{en:'White (carries black & tan)', fr:'Blanc (porteur noir et feu)'},
    genotypes:[
      { code:'atat · kyky · swsw',
        pills:[['atat','A-series','Base color'],['kyky','K-series'],['swsw','S-series']],
        note:{en:'Only one genotype possible. Can produce all coloured & white options plus all White depending on mate.',
              fr:'Un seul génotype possible. Peut produire toutes les options coloré & blanc plus Blanc selon le partenaire.'} },
    ]
  },
];


/* ═══════════════════════════════════════
   SELECT PHENOTYPE
═══════════════════════════════════════ */
function selectPheno(key) {
  selectedKey = key;

  document.querySelectorAll('.pheno-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.key === key);
  });

  renderResults();
}

/* ═══════════════════════════════════════
   GRID
═══════════════════════════════════════ */
function renderGrid(id, group) {
  const container = document.getElementById(id);
  if (!container) return;

  const items = PHENOTYPES.filter(p => p.group === group);

  container.innerHTML = items.map(p => `
    <div class="pheno-card" onclick="selectPheno('${p.key}')">
      <img src="${p.img}" />
      <div class="pheno-card-label">${p.label[lang]}</div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════
   RESULTS
═══════════════════════════════════════ */
function renderResults() {
  const ui = UI[lang];

  const results = document.getElementById('geno-results');
  const hint = document.getElementById('hint-box');
  const banner = document.getElementById('selected-banner');

  if (!selectedKey) {
    results.innerHTML = `<div class="empty-state">🐾<br>${ui.emptyText}</div>`;
    if (banner) banner.classList.remove('visible');
    if (hint) hint.style.display = 'none';
    return;
  }

  const pheno = PHENOTYPES.find(p => p.key === selectedKey);

  results.innerHTML = pheno.genotypes.map((g, i) => `
    <div class="geno-option">
      <div class="geno-option-header">
        <span class="geno-number">${ui.tagStep2} ${i + 1}</span>
      </div>
      <div>${g.note[lang]}</div>
    </div>
  `).join('');

  if (hint) {
    hint.textContent = ui.hint;
    hint.style.display = 'block';
  }
}

/* ═══════════════════════════════════════
   HOOK CALLED BY ui.js
═══════════════════════════════════════ */
window.renderPage = function () {
  renderGrid('grid-coloured', 'coloured');
  renderGrid('grid-white', 'white');
  renderResults();
};

/* allow onclick in HTML */
window.selectPheno = selectPheno;
