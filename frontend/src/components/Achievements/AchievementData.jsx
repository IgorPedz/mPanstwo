import ICON_MAP from "../../Utils/Maps/Icons";

const StarIcon = ICON_MAP["star"];

export const categories = [
  { id: "all", label: "Wszystkie" },
  { id: "ratings", label: "Ocenianie Posłów" },
  { id: "surveys", label: "Ankiety" },
  { id: "legal", label: "Legislacja" },
  { id: "social", label: "Społeczność" }
];

export const achievementsData = [
  { 
    id: 1, 
    cat: "ratings", 
    title: "Pierwszy werdykt", 
    desc: "Oceniono pierwszego posła w systemie.", 
    goal: 1, 
    current: 1, 
    xp: 50, 
    unlocked: true, 
    icon: StarIcon 
  },
  { 
    id: 2, 
    cat: "ratings", 
    title: "Krytyk Parlamentarny", 
    desc: "Wystawiono opinie dla 25 posłów.", 
    goal: 25, 
    current: 25, 
    xp: 250, 
    unlocked: true, 
    icon: StarIcon 
  },
  { 
    id: 3, 
    cat: "ratings", 
    title: "Wielka Setka", 
    desc: "Oceniono 100 posłów – znasz ich wszystkich!", 
    goal: 100, 
    current: 42, 
    xp: 1000, 
    unlocked: false, 
    icon: StarIcon 
  },
  { 
    id: 4, 
    cat: "ratings", 
    title: "Obiektywny Obserwator", 
    desc: "Oceniono po 5 posłów z każdej partii w sejmie.", 
    goal: 5, 
    current: 2, 
    xp: 400, 
    unlocked: false, 
    icon: StarIcon 
  },
  { 
    id: 5, 
    cat: "surveys", 
    title: "Głos zabrany", 
    desc: "Udział w pierwszej ankiecie tematycznej.", 
    goal: 1, 
    current: 1, 
    xp: 100, 
    unlocked: true, 
    icon: StarIcon 
  },
  { 
    id: 6, 
    cat: "surveys", 
    title: "Stały elektorat", 
    desc: "Udział w 20 ankietach dotyczących nowych ustaw.", 
    goal: 20, 
    current: 15, 
    xp: 500, 
    unlocked: false, 
    icon: StarIcon 
  },
  { 
    id: 7, 
    cat: "surveys", 
    title: "Wyrocznia", 
    desc: "Twoja opinia w ankiecie pokryła się z ostatecznym wynikiem głosowania.", 
    goal: 5, 
    current: 1, 
    xp: 600, 
    unlocked: false, 
    icon: StarIcon 
  },
  { 
    id: 8, 
    cat: "legal", 
    title: "Czytelnik Ustaw", 
    desc: "Przeczytano i oceniono 10 projektów ustaw.", 
    goal: 10, 
    current: 3, 
    xp: 300, 
    unlocked: false, 
    icon: StarIcon 
  },
  { 
    id: 9, 
    cat: "legal", 
    title: "Strażnik Konstytucji", 
    desc: "Zgłoszono uwagę merytoryczną do projektu legislacyjnego.", 
    goal: 1, 
    current: 0, 
    xp: 800, 
    unlocked: false, 
    icon: StarIcon 
  },
  { 
    id: 10, 
    cat: "social", 
    title: "Lokalny lider", 
    desc: "Oceniono wszystkich posłów ze swojego okręgu wyborczego.", 
    goal: 1, 
    current: 1, 
    xp: 200, 
    unlocked: true, 
    icon: StarIcon 
  },
  { 
    id: 11, 
    cat: "social", 
    title: "Dyskutant", 
    desc: "Twoje komentarze pod ocenami posłów zebrały 50 polubień.", 
    goal: 50, 
    current: 12, 
    xp: 350, 
    unlocked: false, 
    icon: StarIcon 
  },
  { 
    id: 12, 
    cat: "social", 
    title: "Wpływowy Obywatel", 
    desc: "Twoja ocena posła zmieniła jego średnią o 0.1 pkt.", 
    goal: 1, 
    current: 0, 
    xp: 500, 
    unlocked: false, 
    icon: StarIcon 
  }
];