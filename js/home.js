const TRANSLATIONS = {
  en: {
    eyebrow: "Explore Bull Terrier Genetics",
    title: "Choose a tool",
    desc: "Explore coat colour genetics and simulations",

    geneticsTitle: "Colour genetics",
    geneticsDesc: "Understand colour inheritance",

    crossTitle: "Simulate a litter",
    crossDesc: "Predict puppy outcomes",

    reverseTitle: "Identify genotype",
    reverseDesc: "Find genotype from phenotype",

    glossaryTitle: "Genetics glossary",

    termHomo: "Homozygous",
    descHomo: "Both alleles are identical (e.g. AyAy).",

    termHetero: "Heterozygous",
    descHetero: "The two alleles are different (e.g. Ayat).",

    termLocus: "Locus (plural: loci)",
    descLocus: "A specific position on a gene that controls a trait.",

    termDominant: "Dominant allele",
    descDominant: "An allele that expresses its trait even with only one copy.",

    termRecessive: "Recessive allele",
    descRecessive: "An allele that only expresses when two copies are present.",

    footer: '© 2026 Bull Terrier Genetics. All rights reserved.'
  },

  fr: {
    eyebrow: "Génétique du Bull Terrier",
    title: "Choisissez un outil",
    desc: "Explorez la génétique des couleurs et les simulations",

    geneticsTitle: "Génétique des couleurs",
    geneticsDesc: "Comprendre l’hérédité des couleurs",

    crossTitle: "Simuler une portée",
    crossDesc: "Prédire les chiots possibles",

    reverseTitle: "Identifier le génotype",
    reverseDesc: "Trouver le génotype à partir du phénotype (de l'apparence)",

    glossaryTitle: "Glossaire génétique",

    termHomo: "Homozygote",
    descHomo: "Les deux allèles sont identiques (ex : AyAy).",

    termHetero: "Hétérozygote",
    descHetero: "Les allèles sont différents (ex : Ayat).",

    termLocus: "Locus (pluriel : loci)",
    descLocus: "Position spécifique sur un gène qui détermine un caractère.",

    termDominant: "Allèle dominant",
    descDominant: "S'exprime même avec une seule copie.",

    termRecessive: "Allèle récessif",
    descRecessive: "Ne s'exprime que s'il est présent en deux copies.",

    footer: '© 2026 Génétique du Bull Terrier. Tous droits réservés.'
  }
};

function renderPage() {
  const T = TRANSLATIONS[lang];

  setText('home-eyebrow', T.eyebrow);
  setText('home-title', T.title);
  setText('home-desc', T.desc);

  setText('home-genetics-title', T.geneticsTitle);
  setText('home-genetics-desc', T.geneticsDesc);

  setText('home-cross-title', T.crossTitle);
  setText('home-cross-desc', T.crossDesc);

  setText('home-reverse-title', T.reverseTitle);
  setText('home-reverse-desc', T.reverseDesc);

  setText('glossary-title', T.glossaryTitle);

  setText('term-homo', T.termHomo);
  setText('desc-homo', T.descHomo);

  setText('term-hetero', T.termHetero);
  setText('desc-hetero', T.descHetero);

  setText('term-locus', T.termLocus);
  setText('desc-locus', T.descLocus);

  setText('term-dominant', T.termDominant);
  setText('desc-dominant', T.descDominant);

  setText('term-recessive', T.termRecessive);
  setText('desc-recessive', T.descRecessive);
}

window.renderPage = renderPage;