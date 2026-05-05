import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Settings from "../Global/Settings";
import LogOut from "../Global/LogOut";
import Logo from "../Global/Logo";

import SidebarSections from "./SidebarSections";
import navSections from "./NavSections";

export default function Sidebar() {
  const [openSections, setOpenSections] = useState(() => {
    try {
      const saved = localStorage.getItem("mpanstwo-nav-openSections");
      return saved ? JSON.parse(saved) : { Główne: true };
    } catch {
      return { Główne: true };
    }
  });

  const location = useLocation();
  const navigate = useNavigate();

  const toggleSection = (title) => {
    setOpenSections((prev) => {
      const next = {
        ...prev,
        [title]: !prev[title],
      };
      localStorage.setItem("mpanstwo-nav-openSections", JSON.stringify(next));
      return next;
    });
  };

  return (
    <aside className="color-transition h-screen bg-gray-50 dark:bg-gray-900 w-60 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      <Logo />

      <nav className="flex-1 min-h-0 overflow-y-auto px-3 mt-4 space-y-3">
        <SidebarSections
          navSections={navSections}
          openSections={openSections}
          toggleSection={toggleSection}
          location={location}
          navigate={navigate}
        />
      </nav>

      <div className="color-transition border-t border-gray-100 dark:border-gray-700 space-y-1">
        <Settings />
        <LogOut />
      </div>
    </aside>
  );
}