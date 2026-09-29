export interface WizardQuote {
  id: string;
  quote: string;
  speaker: string;
  role: string;
  bookOrContext: string;
  category: 'WISDOM' | 'COURAGE' | 'CHOICES' | 'MAGIC' | 'WIT' | 'LOYALTY';
  themeColor?: string;
  techParallel?: string;
}

export interface WizardSpell {
  id: string;
  name: string;
  incantation: string;
  pronunciation: string;
  category: 'CHARM' | 'DEFENSE' | 'ELEMENTAL' | 'SUMMONING' | 'TRANSFIGURATION' | 'FORBIDDEN';
  description: string;
  wandMotion: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'MASTER';
  effectType: 'patronus' | 'lumos' | 'alohomora' | 'leviosa' | 'incendio' | 'aguamenti' | 'riddikulus' | 'expelliarmus' | 'accio' | 'nox';
  loreTrivia: string;
  iconName: string;
}

export interface MythicalBeast {
  id: string;
  name: string;
  aka: string;
  classification: 'XXXXX' | 'XXXX' | 'XXX' | 'ETHYL SPIRIT' | string;
  classificationLabel: string;
  element: string;
  nativeRegion: string;
  imageUrl: string;
  primaryColor: string;
  glowColor: string;
  description: string;
  abilities: string[];
  techAffinity: string;
  actionLabel: string;
  actionType: 'phoenix' | 'patronus' | 'dragon' | 'hippogriff';
  quote: string;
  quoteSpeaker: string;
}

export const HARRY_POTTER_QUOTES: WizardQuote[] = [
  {
    id: "quote-1",
    quote: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.",
    speaker: "Albus Dumbledore",
    role: "Headmaster of Hogwarts",
    bookOrContext: "Harry Potter and the Prisoner of Azkaban",
    category: "WISDOM",
    techParallel: "Even the most complex production anomaly yields to systematic debugging and unwavering optimism."
  },
  {
    id: "quote-2",
    quote: "It is our choices, Harry, that show what we truly are, far more than our abilities.",
    speaker: "Albus Dumbledore",
    role: "Headmaster of Hogwarts",
    bookOrContext: "Harry Potter and the Chamber of Secrets",
    category: "CHOICES",
    techParallel: "Architectural integrity, clean code choices, and ethical AI standards define true engineering mastery."
  },
  {
    id: "quote-3",
    quote: "After all this time? — Always.",
    speaker: "Severus Snape",
    role: "Potions Master & Headmaster",
    bookOrContext: "Harry Potter and the Deathly Hallows",
    category: "LOYALTY",
    techParallel: "Unyielding lifelong dedication to mastering deep engineering craft and relentless continuous learning."
  },
  {
    id: "quote-4",
    quote: "The people who are crazy enough to think they can change the world are the ones who do.",
    speaker: "Steve Jobs & Wizarding Visionaries",
    role: "Pioneer of Personal Computing",
    bookOrContext: "Think Different Manifesto",
    category: "MAGIC",
    techParallel: "Daring to build revolutionary software architectures that transform human possibilities."
  },
  {
    id: "quote-5",
    quote: "We've all got both light and dark inside us. What matters is the part we choose to act on. That's who we really are.",
    speaker: "Sirius Black",
    role: "Order of the Phoenix",
    bookOrContext: "Harry Potter and the Order of the Phoenix",
    category: "COURAGE",
    techParallel: "Building benevolent, helpful AI systems requires conscious dedication to safety and human alignment."
  },
  {
    id: "quote-6",
    quote: "Sometimes it is the people no one imagines anything of who do the things that no one can imagine.",
    speaker: "Alan Turing",
    role: "Father of Modern Computing",
    bookOrContext: "Bletchley Park & Theoretical AI",
    category: "WIT",
    techParallel: "Unassuming engineers breaking through impossible computational frontiers with sheer persistence."
  },
  {
    id: "quote-7",
    quote: "It is the quality of one's convictions that determines success, not the number of followers.",
    speaker: "Remus Lupin",
    role: "Defense Against the Dark Arts Master",
    bookOrContext: "Harry Potter and the Deathly Hallows",
    category: "COURAGE",
    techParallel: "True technical leadership is measured by engineering integrity and resilience under pressure."
  },
  {
    id: "quote-8",
    quote: "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration.",
    speaker: "Nikola Tesla",
    role: "Master of Electromagnetism & Wireless Power",
    bookOrContext: "Tesla Energy Manuscripts",
    category: "WISDOM",
    techParallel: "Understanding fundamental physics, signal harmonics, and low-latency system frequencies."
  },
  {
    id: "quote-9",
    quote: "We wizards can conquer any peak when our mind is resolute and our spirit unyielding.",
    speaker: "Minerva McGonagall",
    role: "Transfiguration Professor & Deputy Headmistress",
    bookOrContext: "Hogwarts Defense Chronicles",
    category: "MAGIC",
    techParallel: "The sheer exhilaration of deploying monumental distributed systems built through disciplined effort."
  },
  {
    id: "quote-10",
    quote: "Curiosity is the engine of achievement; never cease to wonder how magic and code work beneath the surface.",
    speaker: "Arthur Weasley",
    role: "Misuse of Muggle Artifacts Office",
    bookOrContext: "Ministry Innovations Ledger",
    category: "WIT",
    techParallel: "Deep curiosity for system internals, compiler design, and AI model interpretability."
  },
  {
    id: "quote-11",
    quote: "Books! And cleverness! There are more important things — courage, friendship, and relentless pursuit of truth.",
    speaker: "Hermione Granger",
    role: "Brightest Witch of Her Age",
    bookOrContext: "Harry Potter and the Philosopher's Stone",
    category: "WIT",
    techParallel: "Collaborative engineering, intellectual honesty, and standing together to solve tough problems."
  },
  {
    id: "quote-12",
    quote: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic. Capable of both inflicting injury, and remedying it.",
    speaker: "Albus Dumbledore",
    role: "Headmaster of Hogwarts",
    bookOrContext: "Harry Potter and the Deathly Hallows",
    category: "WISDOM",
    techParallel: "Prompt engineering, elegant documentation, and human-centric design shaping modern tech."
  }
];

export const WIZARD_SPELLS: WizardSpell[] = [
  {
    id: "spell-1",
    name: "Expecto Patronum",
    incantation: "Expecto Patronum",
    pronunciation: "ex-PEK-toh pah-TROH-num",
    category: "DEFENSE",
    description: "Conjures a radiant silver Spirit Guardian to repel Dementors and banish despair.",
    wandMotion: "Silver double spiral ending with a forward thrust",
    difficulty: "ADVANCED",
    effectType: "patronus",
    loreTrivia: "Requires focusing on your single most powerful happy memory to manifest.",
    iconName: "Shield"
  },
  {
    id: "spell-2",
    name: "Lumos Maxima",
    incantation: "Lumos Maxima",
    pronunciation: "LOO-mos MAX-ih-mah",
    category: "CHARM",
    description: "Unleashes a brilliant blinding burst of warm incandescent light from the wand tip.",
    wandMotion: "Flick upward followed by a gentle circular sweep",
    difficulty: "BEGINNER",
    effectType: "lumos",
    loreTrivia: "A cornerstone wandlighting charm taught to first-years at Hogwarts.",
    iconName: "Sun"
  },
  {
    id: "spell-3",
    name: "Alohomora",
    incantation: "Alohomora",
    pronunciation: "ah-LOH-ho-MOHR-ah",
    category: "CHARM",
    description: "The Unlocking Charm — opens sealed doors, encrypted vaults, and hidden grimoires.",
    wandMotion: "Backward 'S' curve ending in a downward point",
    difficulty: "BEGINNER",
    effectType: "alohomora",
    loreTrivia: "Brought to Britain in the 17th century by the wizard Eldon Henrick.",
    iconName: "Key"
  },
  {
    id: "spell-4",
    name: "Wingardium Leviosa",
    incantation: "Wingardium Leviosa",
    pronunciation: "win-GAR-dee-um leh-vee-OH-sa",
    category: "CHARM",
    description: "The Levitation Charm — causes objects and interface elements to gently float in zero gravity.",
    wandMotion: "Swish and Flick (emphasize the -O-sa!)",
    difficulty: "BEGINNER",
    effectType: "leviosa",
    loreTrivia: "Remember what Hermione said: 'It's Levi-O-sa, not Levio-SA!'",
    iconName: "Feather"
  },
  {
    id: "spell-5",
    name: "Incendio",
    incantation: "Incendio",
    pronunciation: "in-SEN-dee-oh",
    category: "ELEMENTAL",
    description: "Produces a roaring jet of crackling golden fire and swirling magical embers.",
    wandMotion: "Curved flame whip motion",
    difficulty: "INTERMEDIATE",
    effectType: "incendio",
    loreTrivia: "Ancient fire-making spell recorded in The Standard Book of Spells, Grade 1.",
    iconName: "Flame"
  },
  {
    id: "spell-6",
    name: "Aguamenti",
    incantation: "Aguamenti",
    pronunciation: "AH-gwah-MEN-tee",
    category: "ELEMENTAL",
    description: "Conjures a clean, crystalline stream of pure water from the wand tip.",
    wandMotion: "Wave-shaped S flick",
    difficulty: "INTERMEDIATE",
    effectType: "aguamenti",
    loreTrivia: "Taught in sixth-year Charms class by Professor Filius Flitwick.",
    iconName: "Droplets"
  },
  {
    id: "spell-7",
    name: "Riddikulus",
    incantation: "Riddikulus",
    pronunciation: "rih-DIK-yoo-lus",
    category: "DEFENSE",
    description: "Transforms a fearsome Boggart into a burst of harmless celebration and laughter.",
    wandMotion: "Sharp flick and cheerful circle",
    difficulty: "INTERMEDIATE",
    effectType: "riddikulus",
    loreTrivia: "The ultimate defense against fear: sheer humor and joyous celebration.",
    iconName: "Smile"
  },
  {
    id: "spell-8",
    name: "Expelliarmus",
    incantation: "Expelliarmus",
    pronunciation: "ex-PEL-ee-AR-mus",
    category: "DEFENSE",
    description: "The Disarming Charm — sends a vibrant scarlet beam to disarm opponents in duels.",
    wandMotion: "Sharp clockwise spiral ending forward",
    difficulty: "INTERMEDIATE",
    effectType: "expelliarmus",
    loreTrivia: "Harry Potter's signature spell that famously neutralized Lord Voldemort.",
    iconName: "Zap"
  },
  {
    id: "spell-9",
    name: "Accio",
    incantation: "Accio",
    pronunciation: "AK-ee-oh",
    category: "SUMMONING",
    description: "The Summoning Charm — draws distant scrolls, knowledge bases, and artifacts into reach.",
    wandMotion: "Sweeping upward arc pulling inward",
    difficulty: "INTERMEDIATE",
    effectType: "accio",
    loreTrivia: "Mastered by Harry Potter to summon his Firebolt during the First Task of the Triwizard Tournament.",
    iconName: "Magnet"
  },
  {
    id: "spell-10",
    name: "Nox",
    incantation: "Nox",
    pronunciation: "NOCKS",
    category: "CHARM",
    description: "The Wand-Extinguishing Charm — returns the environment to deep midnight stillness.",
    wandMotion: "Quick downward tap",
    difficulty: "BEGINNER",
    effectType: "nox",
    loreTrivia: "The counter-charm to Lumos, invoking the pitch calm of the night.",
    iconName: "Moon"
  }
];

export const MYTHICAL_BEASTS: MythicalBeast[] = [
  {
    id: "beast-1",
    name: "Fawkes the Phoenix",
    aka: "The Immortal Firebird of Hogwarts",
    classification: "XXXX",
    classificationLabel: "DOMESTICABLE BY HIGH WIZARDS ONLY",
    element: "Incandescent Fire & Rebirth",
    nativeRegion: "Egypt / Dumbledore's Sanctuary",
    imageUrl: "/images/beasts/phoenix_fawkes.jpg",
    primaryColor: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.6)",
    description: "A creature of extraordinary beauty with incandescent scarlet and gold plumage. Phoenixes burst into flame when their bodies begin to fail and rise anew from the ash. Their tears possess immense healing powers.",
    abilities: [
      "Perpetual Rebirth from Ashes",
      "Healing Tears of Recovery",
      "Immense Carrying Strength",
      "Flame-Teleportation Travel"
    ],
    techAffinity: "Fault-Tolerant High-Availability Architectures, Automated Crash Recovery & Self-Healing Pipelines",
    actionLabel: "Ignite Phoenix Rebirth",
    actionType: "phoenix",
    quote: "Fascinating creatures, phoenixes. They can carry immensely heavy loads, their tears have healing powers, and they make highly faithful pets.",
    quoteSpeaker: "Albus Dumbledore"
  },
  {
    id: "beast-2",
    name: "The Silver Stag Patronus",
    aka: "The Prongs Ethereal Guardian",
    classification: "ETHYL SPIRIT",
    classificationLabel: "POSITIVE ENERGY INCARNATE",
    element: "Pure Starlight & Silver Mist",
    nativeRegion: "The Forbidden Forest / Caster's Soul",
    imageUrl: "/images/beasts/stag_patronus.jpg",
    primaryColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.6)",
    description: "The physical embodiment of positive hope, courage, and pure magic. When summoned with 'Expecto Patronum', this radiant silver stag charges forth to shield the caster from the darkest forces.",
    abilities: [
      "Absolute Dementor Repulsion",
      "Inter-Wizengamot Message Delivery",
      "Ethereal Darkness Dissipation",
      "Pure Happiness Aura Shield"
    ],
    techAffinity: "End-to-End Cryptographic Security, AI Guardrails & Robust Anomaly Detection",
    actionLabel: "Cast Expecto Patronum",
    actionType: "patronus",
    quote: "The Patronus is a kind of positive force, a projection of the very things that the Dementor feeds upon — hope, happiness, the desire to survive.",
    quoteSpeaker: "Remus Lupin"
  },
  {
    id: "beast-3",
    name: "Hungarian Horntail Dragon",
    aka: "The Fiercest of All Dragons",
    classification: "XXXXX",
    classificationLabel: "KNOWN WIZARD KILLER / UNTAMABLE",
    element: "Roaring Magma & Spiked Armor",
    nativeRegion: "Carpathian Mountains, Hungary",
    imageUrl: "/images/beasts/horntail_dragon.jpg",
    primaryColor: "#EAB308",
    glowColor: "rgba(234, 179, 8, 0.6)",
    description: "Considered the most dangerous dragon breed, with black scales, yellow eyes, bronze horns, and long tail spikes. It breathes fire reaching up to fifty feet with intense scorching heat.",
    abilities: [
      "Fifty-Foot Flame Jet Breath",
      "Impenetrable Dragonhide Armor",
      "Lethal Spiked Tail Sweep",
      "Supreme High-Altitude Maneuvers"
    ],
    techAffinity: "High-Throughput Concurrency, Multi-GPU Parallel Computing & Distributed Scale",
    actionLabel: "Unleash Dragonfire",
    actionType: "dragon",
    quote: "Dragons are seriously misunderstood creatures. Bit fiery, sure, but look at that magnificent beast!",
    quoteSpeaker: "Rubeus Hagrid"
  },
  {
    id: "beast-4",
    name: "Buckbeak the Hippogriff",
    aka: "The Proud Scourge of Malfoy",
    classification: "XXX",
    classificationLabel: "COMPETENT WIZARDS MAY MANAGE",
    element: "Skyward Gale & Noble Talons",
    nativeRegion: "Hogwarts Grounds / Forbidden Forest",
    imageUrl: "/images/beasts/hippogriff_buckbeak.jpg",
    primaryColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.6)",
    description: "Half giant eagle, half muscular steed. Hippogriffs possess fierce pride: one must always maintain eye contact and bow deeply before approaching, awaiting their respectful nod.",
    abilities: [
      "Supersonic Talon Strike",
      "Agile Aerial Gliding",
      "Steely Undying Loyalty",
      "Instinctive Noble Intuition"
    ],
    techAffinity: "Precision UI/UX Design, High-Fidelity Signal Processing & Systems Reliability",
    actionLabel: "Bow with Deep Respect",
    actionType: "hippogriff",
    quote: "Always wait for the Hippogriff to make the first move. Be polite, maintain eye contact, and bow.",
    quoteSpeaker: "Rubeus Hagrid"
  }
];
