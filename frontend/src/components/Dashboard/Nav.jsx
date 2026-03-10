import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import ICON_MAP from "../../Utils/Icons";
import Settings from "../Global/Settings";
import LogOut from "../Global/LogOut";
import Logo from "../Global/Logo";

const navSections = [
  {
    title: "Główne",
    items: [
      { name: "Strona główna", icon: "dashboard" },
      { name: "Sondaże", icon: "stats" },
      { name: "Kalendarz wydarzeń", icon: "events" },
    ],
  },
  {
    title: "Społeczność",
    items: [
      { name: "Wiadomości", icon: "messages" },
      { name: "Powiadomienia", icon: "notifications" },
    ],
  },
  {
    title: "Edukacja",
    items: [

      { name: "Kursy i samouczki", icon: "courses" },
    ],
  },
  {
    title: "Profil",
    items: [
      { name: "Moje konto", icon: "profil" },
      { name: "Osiągnięcia", icon: "achievements" },
      { name: "Skrytka ankiet", icon: "survey" },
    ],
  },
  {
    title: "Strona",
    items: [
      { name: "Dokumenty", icon: "documents" },
      { name: "O projekcie", icon: "project" },
      { name: "O nas", icon: "about" },
    ],
  },
];

export default function Sidebar() {
  const [openSections, setOpenSections] = useState({
    "Główne": true,
  });

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="color-transition h-dvh w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">

      <Logo />

      <nav className="flex-1 min-h-0 overflow-y-auto px-3 mt-4 space-y-3">
        {navSections.map((section) => {
          const isOpen = openSections[section.title];

          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="cursor-pointer w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase text-gray-400 hover:text-gray-600"
              >
                {section.title}
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="space-y-1 mt-1">
                  {section.items.map((item) => {
                    const Icon = ICON_MAP[item.icon];
                    if (!Icon) return null;

                    return (
                      <button
                        key={item.name}
                        className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-100 dark:border-gray-700 space-y-1">
        <Settings />
        <LogOut />
      </div>
    </aside>
  );
}