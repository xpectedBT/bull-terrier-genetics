/* ══════════════════════════════════════════
   cross.js — page logic for cross.html
   Depends on ui.js for: lang, setText, toggleClass
══════════════════════════════════════════ */

/* ══════════════════════════════════════════
   PNG ASSET MAP
══════════════════════════════════════════ */
const DOG_IMAGES = {
  'red-solid':           'assets/BT_SolidRed.png',
  'red-white':           'assets/BT_Red_White.png',
  'tri-solid':           'assets/BT_SolidTri.png',
  'tri-white':           'assets/BT_Tri.png',
  'brindle-solid':       'assets/BT_SolidBrindle.png',
  'brindle-white':       'assets/BT_Brindle_White.png',
  'black-brindle-solid': 'assets/BT_SolidBlackBrindle.png',
  'black-brindle-white': 'assets/BT_BlackBrindle.png',
  'white-red':           'assets/BT_white_CarRed.png',
  'white-tri':           'assets/BT_white_CarTri.png',
  'white-brindle':       'assets/BT_white_CarBrindle.png',
  'white-black-brindle': 'assets/BT_white_CarBlackBrindle.png',
};

/* ══════════════════════════════════════════
   STARTING GENOTYPES (used on first load only —
   any value the user picks is preserved across language switches)
══════════════════════════════════════════ */
const DEFAULTS = {
  'p1-A': 'Ayat', 'p1-K': 'kbrky', 'p1-S': 'sisw',
  'p2-A': 'Ayat', 'p2-K': 'kyky',  'p2-S': 'sisw',
};

/* ══════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════ */
const CT = {
  en:{
    eyebrow:'Litter Simulator · Coat Colour',
    title:'Simulate your litter',
    desc:'Set the genotype of both parents across three key loci. The tool calculates the exact probability of every possible puppy coat colour.',
    tagParents:'Step 1', titleParents:'Set parent genotypes',
    tagResults:'Step 2', titleResults:'Possible puppy outcomes',
    p1:'Sire (♂)', p2:'Dam (♀)',
    aLocus:'A-series · Base colour', kLocus:'K-series · Brindle', sLocus:'S-series · White',
    methodLabel:'Calculation method:',
    btnExact:'Exact probabilities', btnSim:'Simulate 16 puppies',
    resultsLabel:'Possible phenotypes',
    note:'These probabilities are theoretical and apply to large populations. In a real litter of 4–8 puppies, the actual outcome can differ significantly by chance — just like flipping a coin.',
    noteSimu:'Simulation of 16 random puppies drawn from the genetic probabilities above.',
    footer:'Based on Colour in Bull Terriers – Part 2 – Inheritance of Colour by Tracey Butchart (2009). Genetic framework: Kerns et al. (2007), Candille et al. (2007), Schmutz & Berryere (2007).',
    A:{ AyAy:'Ay Ay — Red/fawn (true)',Ayat:'Ay at — Red/fawn (carrier tri)',atat:'at at — Black & tan / tri' },
    K:{ kbrkbr:'kbr kbr — Brindle (true)',kbrky:'kbr ky — Brindle (carrier)',kyky:'ky ky — Non-brindle' },
    S:{ sisi:'si si — Solid coloured',sisw:'si sw — Coloured & white',swsw:'sw sw — All white' },
    phenoLabel(ph){
      const map={
        'red-solid':'Red solid','red-white':'Red & white',
        'tri-solid':'Black & tan solid','tri-white':'Tricolour & white',
        'brindle-solid':'Brindle solid','brindle-white':'Brindle & white',
        'black-brindle-solid':'Black brindle solid','black-brindle-white':'Black brindle & white',
        'white-red':'White (carries red)','white-tri':'White (carries tri)',
        'white-brindle':'White (carries brindle)','white-black-brindle':'White (carries black brindle)',
      };
      return map[ph]||ph;
    },
    genoDesc(A,K,S){
      const ab=A==='AyAy'?'Ay Ay':A==='Ayat'?'Ay at':'at at';
      const kb=K==='kbrkbr'?'kbr kbr':K==='kbrky'?'kbr ky':'ky ky';
      const sb=S==='sisi'?'si si':S==='sisw'?'si sw':'sw sw';
      return [ab,kb,sb];
    },
    phenoVisible(A,K,S){
      if(S==='swsw'){
        if(!A.includes('Ay')&&K.includes('kbr')) return 'White (carries black brindle)';
        if(!A.includes('Ay')) return 'White (carries tri)';
        if(K.includes('kbr')) return 'White (carries brindle)';
        return 'White (carries red)';
      }
      const base=A.includes('Ay')?'red':'tri';
      const brindle=K.includes('kbr');
      const partial=S==='sisw';
      if(base==='red'&&!brindle) return partial?'Red & white':'Red solid';
      if(base==='red'&&brindle)  return partial?'Brindle & white':'Brindle solid';
      if(base==='tri'&&!brindle) return partial?'Tricolour & white':'Black & tan solid';
      return partial?'Black brindle & white':'Black brindle solid';
    }
  },
  fr:{
    eyebrow:'Simulateur de portée · Couleur de robe',
    title:'Simuler votre portée',
    desc:'Définissez le génotype des deux parents pour les trois loci principaux. L\'outil calcule la probabilité exacte de chaque couleur de robe possible.',
    tagParents:'Étape 1', titleParents:'Définir les génotypes des parents',
    tagResults:'Étape 2', titleResults:'Résultats possibles des chiots',
    p1:'Père (♂)', p2:'Mère (♀)',
    aLocus:'Série A · Couleur de base', kLocus:'Série K · Bringé', sLocus:'Série S · Blanc',
    methodLabel:'Méthode de calcul :',
    btnExact:'Probabilités exactes', btnSim:'Simuler 16 chiots',
    resultsLabel:'Phénotypes possibles',
    note:'Ces probabilités sont théoriques et s\'appliquent à de grandes populations, elles représentent le champ des possibles. Dans une portée réelle de 4 à 8 chiots, le résultat peut différer significativement par hasard — comme lancer une pièce.',
    noteSimu:'Simulation de 16 chiots aléatoires tirés des probabilités génétiques ci-dessus.',
    footer:'D\'après Colour in Bull Terriers – Part 2 de Tracey Butchart (2009). Références : Kerns et al. (2007), Candille et al. (2007), Schmutz & Berryere (2007).',
    A:{ AyAy:'Ay Ay — Rouge/fauve (vrai)',Ayat:'Ay at — Rouge/fauve (porteur tri)',atat:'at at — Noir et feu / tricolore' },
    K:{ kbrkbr:'kbr kbr — Bringé (vrai)',kbrky:'kbr ky — Bringé (porteur)',kyky:'ky ky — Non-bringé' },
    S:{ sisi:'si si — Solide coloré',sisw:'si sw — Coloré & blanc',swsw:'sw sw — Entièrement blanc' },
    phenoLabel(ph){
      const map={
        'red-solid':'Rouge solide','red-white':'Rouge & blanc',
        'tri-solid':'Noir et feu solide','tri-white':'Tricolore & blanc',
        'brindle-solid':'Bringé solide','brindle-white':'Bringé & blanc',
        'black-brindle-solid':'Bringé noir solide','black-brindle-white':'Bringé noir & blanc',
        'white-red':'Blanc (porteur rouge)','white-tri':'Blanc (porteur tri)',
        'white-brindle':'Blanc (porteur bringé)','white-black-brindle':'Blanc (porteur bringé noir)',
      };
      return map[ph]||ph;
    },
    genoDesc(A,K,S){
      const ab=A==='AyAy'?'Ay Ay':A==='Ayat'?'Ay at':'at at';
      const kb=K==='kbrkbr'?'kbr kbr':K==='kbrky'?'kbr ky':'ky ky';
      const sb=S==='sisi'?'si si':S==='sisw'?'si sw':'sw sw';
      return [ab,kb,sb];
    },
    phenoVisible(A,K,S){
      if(S==='swsw'){
        if(!A.includes('Ay')&&K.includes('kbr')) return 'Blanc (porteur bringé noir)';
        if(!A.includes('Ay')) return 'Blanc (porteur tri)';
        if(K.includes('kbr')) return 'Blanc (porteur bringé)';
        return 'Blanc (porteur rouge)';
      }
      const base=A.includes('Ay')?'red':'tri';
      const brindle=K.includes('kbr');
      const partial=S==='sisw';
      if(base==='red'&&!brindle) return partial?'Rouge & blanc':'Rouge solide';
      if(base==='red'&&brindle)  return partial?'Bringé & blanc':'Bringé solide';
      if(base==='tri'&&!brindle) return partial?'Tricolore & blanc':'Noir et feu solide';
      return partial?'Bringé noir & blanc':'Bringé noir solide';
    }
  }
};

/* ══════════════════════════════════════════
   PHENOTYPE KEY
══════════════════════════════════════════ */
function phenoKey(A,K,S){
  const isWhite   = S==='swsw';
  const isBase    = A.includes('Ay');
  const isBrindle = K.includes('kbr');
  const isPartial = S==='sisw';
  if(isWhite){
    if(isBase  && !isBrindle) return 'white-red';
    if(isBase  &&  isBrindle) return 'white-brindle';
    if(!isBase && !isBrindle) return 'white-tri';
    return 'white-black-brindle';
  }
  if(isBase  && !isBrindle) return isPartial?'red-white':'red-solid';
  if(isBase  &&  isBrindle) return isPartial?'brindle-white':'brindle-solid';
  if(!isBase && !isBrindle) return isPartial?'tri-white':'tri-solid';
  return isPartial?'black-brindle-white':'black-brindle-solid';
}

/* ══════════════════════════════════════════
   GAMETES HELPER
══════════════════════════════════════════ */
function getGametes(geno, alleles){
  const[a,b]=alleles;
  if(geno===a+a) return[a,a];
  if(geno===b+b) return[b,b];
  return[a,b];
}

/* ══════════════════════════════════════════
   EXACT PROBABILITY (64 combos)
══════════════════════════════════════════ */
function exactProbs(p1A,p1K,p1S,p2A,p2K,p2S){
  const aA=['Ay','at'], aK=['kbr','ky'], aS=['si','sw'];
  const g1A=getGametes(p1A,aA), g2A=getGametes(p2A,aA);
  const g1K=getGametes(p1K,aK), g2K=getGametes(p2K,aK);
  const g1S=getGametes(p1S,aS), g2S=getGametes(p2S,aS);
  const counts={}; let total=0;
  for(const a1 of g1A) for(const a2 of g2A)
  for(const k1 of g1K) for(const k2 of g2K)
  for(const s1 of g1S) for(const s2 of g2S){
    const cA=[a1,a2].sort((x,y)=>(x==='Ay'?0:1)-(y==='Ay'?0:1)).join('');
    const cK=[k1,k2].sort((x,y)=>(x==='kbr'?0:1)-(y==='kbr'?0:1)).join('');
    const cS=[s1,s2].sort((x,y)=>(x==='si'?0:1)-(y==='si'?0:1)).join('');
    const pk=phenoKey(cA,cK,cS);
    counts[pk]=(counts[pk]||0)+1; total++;
  }
  return Object.entries(counts).map(([k,n])=>({key:k,prob:n/total,n,total})).sort((a,b)=>b.prob-a.prob);
}

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let method = 'exact';

function setMethod(m){
  method=m;
  toggleClass('btn-exact', 'active', m==='exact');
  toggleClass('btn-sim', 'active', m==='sim');
  update();
}
window.setMethod = setMethod;
window.update = update; // referenced by the onchange="update()" attributes in cross.html

/* ══════════════════════════════════════════
   BUILD SELECTS
══════════════════════════════════════════ */
function buildSelect(id, locus, savedVal){
  const sel=document.getElementById(id);
  const opts=locus==='A'?CT[lang].A:locus==='K'?CT[lang].K:CT[lang].S;
  sel.innerHTML=Object.entries(opts).map(([v,label])=>`<option value="${v}">${label}</option>`).join('');
  const useVal = savedVal || DEFAULTS[id];
  if(useVal && sel.querySelector(`option[value="${useVal}"]`)) sel.value=useVal;
}

/* ══════════════════════════════════════════
   UPDATE PARENT PREVIEW
══════════════════════════════════════════ */
function updatePreview(num){
  const t=CT[lang];
  const A=document.getElementById(`p${num}-A`).value;
  const K=document.getElementById(`p${num}-K`).value;
  const S=document.getElementById(`p${num}-S`).value;
  const pk=phenoKey(A,K,S);
  const src=DOG_IMAGES[pk]||DOG_IMAGES['red-solid'];

  const imgEl=document.getElementById(`p${num}-img`);
  if(imgEl){
    imgEl.src=src;
    imgEl.alt=t.phenoVisible(A,K,S);
  }

  setText(`p${num}-pheno-label`, t.phenoVisible(A,K,S));
  const pills=t.genoDesc(A,K,S);
  document.getElementById(`p${num}-geno-pills`).innerHTML=pills.map(p=>`<span class="gpill">${p}</span>`).join('');
}

/* ══════════════════════════════════════════
   UPDATE RESULTS
══════════════════════════════════════════ */
function update(){
  updatePreview(1); updatePreview(2);
  const t=CT[lang];
  const p1A=document.getElementById('p1-A').value, p1K=document.getElementById('p1-K').value, p1S=document.getElementById('p1-S').value;
  const p2A=document.getElementById('p2-A').value, p2K=document.getElementById('p2-K').value, p2S=document.getElementById('p2-S').value;

  let outcomes;
  if(method==='exact'){
    outcomes=exactProbs(p1A,p1K,p1S,p2A,p2K,p2S);
    setText('results-note', t.note);
  } else {
    const aA=['Ay','at'],aK=['kbr','ky'],aS=['si','sw'];
    const g1A=getGametes(p1A,aA),g2A=getGametes(p2A,aA);
    const g1K=getGametes(p1K,aK),g2K=getGametes(p2K,aK);
    const g1S=getGametes(p1S,aS),g2S=getGametes(p2S,aS);
    const counts={};
    for(let i=0;i<16;i++){
      const a1=g1A[Math.floor(Math.random()*2)],a2=g2A[Math.floor(Math.random()*2)];
      const k1=g1K[Math.floor(Math.random()*2)],k2=g2K[Math.floor(Math.random()*2)];
      const s1=g1S[Math.floor(Math.random()*2)],s2=g2S[Math.floor(Math.random()*2)];
      const cA=[a1,a2].sort((x,y)=>(x==='Ay'?0:1)-(y==='Ay'?0:1)).join('');
      const cK=[k1,k2].sort((x,y)=>(x==='kbr'?0:1)-(y==='kbr'?0:1)).join('');
      const cS=[s1,s2].sort((x,y)=>(x==='si'?0:1)-(y==='si'?0:1)).join('');
      counts[phenoKey(cA,cK,cS)]=(counts[phenoKey(cA,cK,cS)]||0)+1;
    }
    outcomes=Object.entries(counts).map(([k,n])=>({key:k,prob:n/16,n,total:16})).sort((a,b)=>b.prob-a.prob);
    setText('results-note', t.noteSimu);
  }

  document.getElementById('results-grid').innerHTML=outcomes.map(o=>{
    const pct=Math.round(o.prob*100);
    const frac=method==='exact'?`${o.n}/${o.total}`:`${o.n}/16`;
    return `<div class="result-card">
      <img src="${DOG_IMAGES[o.key]||DOG_IMAGES['red-solid']}" alt="${t.phenoLabel(o.key)}" loading="lazy"/>
      <div class="result-pct">${pct}%</div>
      <div class="result-label">${t.phenoLabel(o.key)}</div>
      <div class="result-geno">${frac}</div>
    </div>`;
  }).join('');
}

/* ══════════════════════════════════════════
   REBUILD PAGE TEXT
══════════════════════════════════════════ */
function rebuildText(){
  const t=CT[lang];
  setText('hdr-eyebrow', t.eyebrow);
  setText('hdr-title', t.title);
  setText('hdr-desc', t.desc);
  setText('card-tag-parents', t.tagParents);
  setText('card-title-parents', t.titleParents);
  setText('card-tag-results', t.tagResults);
  setText('card-title-results', t.titleResults);
  setText('p1-label', t.p1);
  setText('p2-label', t.p2);
  setText('p1-a-label', t.aLocus);
  setText('p1-k-label', t.kLocus);
  setText('p1-s-label', t.sLocus);
  setText('p2-a-label', t.aLocus);
  setText('p2-k-label', t.kLocus);
  setText('p2-s-label', t.sLocus);
  setText('method-label', t.methodLabel);
  setText('btn-exact', t.btnExact);
  setText('btn-sim', t.btnSim);
  setText('results-section-label', t.resultsLabel);
  setText('footer-ref', t.footer);
}

function rebuildSelects(){
  const vals={
    p1A:document.getElementById('p1-A').value, p1K:document.getElementById('p1-K').value, p1S:document.getElementById('p1-S').value,
    p2A:document.getElementById('p2-A').value, p2K:document.getElementById('p2-K').value, p2S:document.getElementById('p2-S').value,
  };
  buildSelect('p1-A','A',vals.p1A); buildSelect('p1-K','K',vals.p1K); buildSelect('p1-S','S',vals.p1S);
  buildSelect('p2-A','A',vals.p2A); buildSelect('p2-K','K',vals.p2K); buildSelect('p2-S','S',vals.p2S);
}

/* ══════════════════════════════════════════
   FULL PAGE RENDER (hook called by ui.js)
══════════════════════════════════════════ */
window.renderPage = function(){
  rebuildText();
  rebuildSelects();
  update();
};
