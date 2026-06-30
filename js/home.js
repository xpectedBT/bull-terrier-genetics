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
    reverseDesc: "Find genotype from phenotype"
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
    reverseDesc: "Trouver le génotype à partir du phénotype (de l'apparence)"
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
}

window.renderPage = renderPage;