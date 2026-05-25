import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import ICON_MAP from "../../Utils/Maps/Icons";
import NavBadge from "../Notifications/NotificationBadge";

export default function NavSections({
  NavData,
  openSection,
  toggleSection,
  location,
  navigate,
}) {
  const { t } = useTranslation();

  const ChevronDownIcon = ICON_MAP["dropdown"];

  return (
    <div className="space-y-4">
      {NavData.map((section) => {
        const isOpen = openSection === section.key;

        return (
          <div key={section.key} className="flex flex-col">
            <button
              type="button"
              onClick={() => toggleSection(section.key)}
              className="
                group w-full flex items-center justify-between
                px-2 py-2
                text-[10px] font-black uppercase tracking-[0.2em]
                text-slate-400
                hover:text-slate-600 dark:hover:text-slate-200
                transition-colors cursor-pointer
              "
            >
              <span>{t(section.title)}</span>

              <ChevronDownIcon
                className={`
                  h-3 w-3 transition-transform duration-300
                  ${isOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            <div className="relative">
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 mt-2 pb-2">
                      {section.items.map((item) => {
                        const Icon = ICON_MAP[item.icon];

                        if (!Icon) return null;

                        const active =
                          location.pathname === item.href;

                        return (
                          <button
                            key={item.href}
                            type="button"
                            onClick={() => navigate(item.href)}
                            className={`
                              relative w-full flex items-center gap-3
                              px-4 py-3 rounded-xl
                              text-[10px] font-black uppercase tracking-widest
                              transition-all duration-200
                              cursor-pointer group
                              ${
                                active
                                  ? `
                                    bg-slate-900 dark:bg-white
                                    text-white dark:text-slate-900
                                    shadow-lg shadow-indigo-500/10
                                  `
                                  : `
                                    text-slate-500 dark:text-slate-400
                                    hover:bg-slate-100
                                    dark:hover:bg-slate-900/50
                                    hover:text-slate-900
                                    dark:hover:text-slate-100
                                  `
                              }
                            `}
                          >
                            {active && (
                              <motion.div
                                layoutId="nav-active-pill"
                                className="
                                  absolute left-0
                                  w-1 h-4
                                  bg-indigo-500 dark:bg-indigo-400
                                  rounded-r-full
                                "
                              />
                            )}

                            <Icon
                              className={`
                                h-4 w-4
                                transition-transform
                                group-hover:scale-110
                                ${
                                  active
                                    ? "opacity-100"
                                    : "opacity-70 group-hover:opacity-100"
                                }
                              `}
                            />

                            <span className="relative flex items-center gap-2 w-full">
                              {t(item.name)}

                              {item.badge && (
                                <NavBadge type={item.badge} />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}