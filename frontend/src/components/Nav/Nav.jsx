import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavData } from "../../Hooks/useNavData";

import SidebarMobileTrigger from "./NavMobile";
import SidebarContent from "./NavContent";

export default function Sidebar() {
  const navData = useNavData();
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState(() => {
    try {
      const saved = localStorage.getItem("mpanstwo-nav-openSections");
      // Use the first section title from navData if not saved
      const firstSection = navData[0]?.title || "Main";
      return saved ? JSON.parse(saved) : { [firstSection]: true };
    } catch {
      const firstSection = navData[0]?.title || "Main";
      return { [firstSection]: true };
    }
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setIsOpen(false), [location.pathname]);

  const toggleSection = (title) => {
    setOpenSections((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      localStorage.setItem("mpanstwo-nav-openSections", JSON.stringify(next));
      return next;
    });
  };

  return (
    <>
      <SidebarMobileTrigger isOpen={isOpen} setIsOpen={setIsOpen} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[80]"
          />
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex flex-col w-60 h-screen bg-white dark:bg-slate-950 border-r-2 border-slate-100 dark:border-slate-900 overflow-hidden color-transition">
        <SidebarContent
          NavData={navData}
          openSections={openSections}
          toggleSection={toggleSection}
          location={location}
          navigate={navigate}
        />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-y-0 left-0 z-[90] w-72 h-screen bg-white dark:bg-slate-950 border-r-2 border-slate-900 flex flex-col overflow-hidden shadow-2xl"
          >
            <SidebarContent
              NavData={navData}
              openSections={openSections}
              toggleSection={toggleSection}
              location={location}
              navigate={navigate}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
