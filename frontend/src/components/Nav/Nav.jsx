import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useNavData } from "../../Hooks/useNavData";

import SidebarMobileTrigger from "./NavMobile";
import SidebarContent from "./NavContent";

export default function Sidebar() {
  const navData = useNavData();

  const [isOpen, setIsOpen] = useState(false);

  const [openSection, setOpenSection] = useState(() => {
    try {
      const saved = localStorage.getItem("mpanstwo-nav-openSection");
      return saved ? JSON.parse(saved) : navData[0]?.key || null;
    } catch {
      return navData[0]?.key || null;
    }
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleSection = (key) => {
    setOpenSection((prev) => {
      const next = prev === key ? null : key;

      localStorage.setItem(
        "mpanstwo-nav-openSection",
        JSON.stringify(next)
      );

      return next;
    });
  };

  return (
    <>
      {/* MOBILE TRIGGER */}
      <SidebarMobileTrigger
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="
              fixed inset-0 z-[80]
              bg-slate-950/60
              backdrop-blur-sm
              lg:hidden
            "
          />
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden lg:flex flex-col
          w-60 h-screen
          bg-white dark:bg-slate-950
          border-r-2 border-slate-100
          dark:border-slate-900
          overflow-hidden
          color-transition
        "
      >
        <SidebarContent
          NavData={navData}
          openSection={openSection}
          toggleSection={toggleSection}
          location={location}
          navigate={navigate}
        />
      </aside>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="
              fixed inset-y-0 left-0 z-[90]
              w-72 h-screen
              bg-white dark:bg-slate-950
              border-r-2 border-slate-900
              flex flex-col
              overflow-hidden
              shadow-2xl
              lg:hidden
            "
          >
            <SidebarContent
              NavData={navData}
              openSection={openSection}
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