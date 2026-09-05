// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "Appunti per i curiosi e per chi si distrae facilmente, su modelli linguistici e conoscenza.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "Notes for the curious and the easily distracted, on language models, knowledge and what gets lost.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-papers",
          title: "papers",
          description: "I lavori pubblicati su NLP, rappresentazione della conoscenza e sistemi multi-agente.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/it/publications/";
          },
        },{id: "nav-papers",
          title: "papers",
          description: "Published work on natural language processing, knowledge representation and multi-agent systems.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-repo",
          title: "repo",
          description: "Esplora i miei progetti e contributi su GitHub.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/it/repositories/";
          },
        },{id: "nav-repo",
          title: "repo",
          description: "Explore my GitHub projects and contributions.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Sapientia et doctrina sanitas",
          section: "Navigation",
          handler: () => {
            window.location.href = "/it/cv/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Sapientia et doctrina sanitas",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-invocazione",
        
          title: "Invocazione",
        
        description: "Della doppiezza, delle soglie e dei segni che lasciamo",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/it/blog/2026/janus/";
          
        },
      },{id: "post-invocation",
        
          title: "Invocation",
        
        description: "Of doubleness, thresholds and the marks we leave",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/janus/";
          
        },
      },{id: "post-un-manifesto-smarrito",
        
          title: "Un manifesto smarrito",
        
        description: "perché esiste questo blog, e che cosa ci finirà dentro",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/it/blog/2026/misplaced-manifesto/";
          
        },
      },{id: "post-a-misplaced-manifesto",
        
          title: "A misplaced manifesto",
        
        description: "why this blog exists, and what will end up in it",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/misplaced-manifesto/";
          
        },
      },{id: "news-site-launched",
          title: 'Site launched!',
          description: "",
          section: "News",},{id: "news-il-sito-è-online",
          title: 'Il sito è online!',
          description: "",
          section: "News",},{id: "news-the-proceedings-of-the-fifth-international-workshop-on-llm-integrated-knowledge-graph-generation-from-text-text2kg-are-out-including-my-paper-xch-mind-multi-agent-interpretive-knowledge-graph-augmentation-over-cultural-heritage-linked-data",
          title: 'The proceedings of the Fifth International Workshop on LLM-Integrated Knowledge Graph Generation From...',
          description: "",
          section: "News",},{id: "news-sono-usciti-gli-atti-del-fifth-international-workshop-on-llm-integrated-knowledge-graph-generation-from-text-text2kg-che-contengono-il-mio-articolo-xch-mind-multi-agent-interpretive-knowledge-graph-augmentation-over-cultural-heritage-linked-data",
          title: 'Sono usciti gli atti del Fifth International Workshop on LLM-Integrated Knowledge Graph Generation...',
          description: "",
          section: "News",},{id: "news-started-lost-amp-amp-found-a-place-for-notes-dead-ends-and-things-that-lost-their-context-here-s-a-misplaced-manifesto-to-say-what-for",
          title: 'Started Lost&amp;amp;amp;Found, a place for notes, dead ends and things that lost their...',
          description: "",
          section: "News",},{id: "news-nasce-oggetti-smarriti-un-posto-per-appunti-vicoli-ciechi-e-cose-che-hanno-perso-il-loro-contesto-il-perché-è-in-un-manifesto-smarrito",
          title: 'Nasce Oggetti Smarriti, un posto per appunti, vicoli ciechi e cose che hanno...',
          description: "",
          section: "News",},{id: "news-etimo-v1-is-out-it-traces-a-word-s-recorded-ancestry-through-wiktionary-one-ancestor-at-a-time",
          title: 'etimo v1 is out — it traces a word’s recorded ancestry through Wiktionary,...',
          description: "",
          section: "News",},{id: "news-etimo-v1-è-disponibile-risale-l-ascendenza-documentata-di-una-parola-attraverso-wiktionary-un-antenato-alla-volta",
          title: 'etimo v1 è disponibile: risale l’ascendenza documentata di una parola attraverso Wiktionary, un...',
          description: "",
          section: "News",},{id: "news-the-site-is-now-bilingual-every-page-has-an-italian-version-written-rather-than-translated",
          title: 'The site is now bilingual: every page has an Italian version, written rather...',
          description: "",
          section: "News",},{id: "news-il-sito-ha-ora-una-versione-italiana-questa-scritta-e-non-tradotta-accanto-a-quella-inglese",
          title: 'Il sito ha ora una versione italiana — questa, scritta e non tradotta...',
          description: "",
          section: "News",},{id: "notes-umberto-eco-the-search-for-the-perfect-language",
          title: 'Umberto Eco - The Search for the Perfect Language',
          description: "Eco on the European dream of a perfect language, lost at Babel and endlessly sought.",
          section: "Notes",handler: () => {
              window.location.href = "/notes/eco-search-for-the-perfect-language/";
            },},{id: "notes-umberto-eco-la-ricerca-della-lingua-perfetta",
          title: 'Umberto Eco - La ricerca della lingua perfetta',
          description: "Eco e l&#39;ossessione europea per una lingua perfetta, perduta a Babele e inseguita da allora.",
          section: "Notes",handler: () => {
              window.location.href = "/it/notes/eco-search-for-the-perfect-language/";
            },},{id: "notes-merton-amp-barber-viaggi-e-avventure-della-serendipity",
          title: 'Merton &amp;amp; Barber - Viaggi e avventure della serendipity',
          description: "Merton e Barber seguono una parola: serendipity è l&#39;accidente più la sagacia di riconoscerlo.",
          section: "Notes",handler: () => {
              window.location.href = "/it/notes/merton-barber-serendipity/";
            },},{id: "notes-a-e-stallings-lost-and-found",
          title: 'A.E. Stallings - Lost and Found',
          description: "Il sogno in ottava rima della valle sulla luna, dove si raccoglie tutto quello che sulla terra si perde.",
          section: "Notes",handler: () => {
              window.location.href = "/it/notes/stallings-lost-and-found/";
            },},{id: "notes-ludwig-wittgenstein-ricerche-filosofiche",
          title: 'Ludwig Wittgenstein - Ricerche filosofiche',
          description: "Il secondo Wittgenstein: il significato è l&#39;uso, e si decide nei giochi linguistici dentro una forma di vita.",
          section: "Notes",handler: () => {
              window.location.href = "/it/notes/wittgenstein-philosophical-investigations/";
            },},{id: "notes-ludwig-wittgenstein-tractatus-logico-philosophicus",
          title: 'Ludwig Wittgenstein - Tractatus logico-philosophicus',
          description: "Il primo Wittgenstein: il linguaggio come raffigurazione del mondo, fino al limite oltre il quale deve tacere.",
          section: "Notes",handler: () => {
              window.location.href = "/it/notes/wittgenstein-tractatus/";
            },},{id: "notes-merton-amp-barber-the-travels-and-adventures-of-serendipity",
          title: 'Merton &amp;amp; Barber - The Travels and Adventures of Serendipity',
          description: "Merton and Barber trace the word serendipity: accident plus the sagacity to see it.",
          section: "Notes",handler: () => {
              window.location.href = "/notes/merton-barber-serendipity/";
            },},{id: "notes-a-e-stallings-lost-and-found",
          title: 'A.E. Stallings - Lost and Found',
          description: "The ottava-rima dream of the valley on the moon where everything lost on earth accrues.",
          section: "Notes",handler: () => {
              window.location.href = "/notes/stallings-lost-and-found/";
            },},{id: "notes-ludwig-wittgenstein-philosophical-investigations",
          title: 'Ludwig Wittgenstein - Philosophical Investigations',
          description: "The later Wittgenstein: meaning is use, worked out in language-games inside a form of life.",
          section: "Notes",handler: () => {
              window.location.href = "/notes/wittgenstein-philosophical-investigations/";
            },},{id: "notes-ludwig-wittgenstein-tractatus-logico-philosophicus",
          title: 'Ludwig Wittgenstein - Tractatus Logico-Philosophicus',
          description: "The early Wittgenstein: language as a picture of the world, up to the limit where it must fall silent.",
          section: "Notes",handler: () => {
              window.location.href = "/notes/wittgenstein-tractatus/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("https://6michelestingo9.github.io/assets/rendercv/rendercv_output/Michele_Stingo_CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%74%69%6E%67%6F%6D%69%63%68%65%6C%65@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/michele-stingo", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/6MicheleStingo9", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-0227-6129", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=8O5RRAMAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
