const navSections = [
  {
    title: "Główne",
    items: [
      { name: "Strona główna", icon: "dashboard", href: "/dashboard" },
      { name: "Sondaże", icon: "stats", href: "/polls" },
      { name: "Kalendarz wydarzeń", icon: "events", href: "/calendar" },
    ],
  },
  {
    title: "Edukacja",
    items: [
      { name: "Kursy i samouczki", icon: "courses", href: "/courses" },
    ],
  },
  {
    title: "Profil",
    items: [
      { name: "Mój Profil", icon: "profile", href: "/profile" },
      { name: "Osiągnięcia", icon: "achievements", href: "/achievements" },
      { name: "Skrytka ankiet", icon: "survey", href: "/survey-box" },
      { name: "Powiadomienia", icon: "notifications", href: "/notifications" },
    ],
  },
  {
    title: "Strona",
    items: [
      { name: "Dokumenty", icon: "documents", href: "/documents" },
      { name: "Kontakt", icon: "contact", href: "/contact" },
      { name: "Pomoc", icon: "about", href: "/help" },
    ],
  },
];

export default navSections;