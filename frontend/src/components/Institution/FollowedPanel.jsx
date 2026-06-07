import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BellAlertIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useFollowStore } from "../../store/useFollowStore";
import { useUser } from "../../Contexts/UserContext";
import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { getMinistriesData } from "../../data/ministriesData";
import { getJudicialData } from "../../data/judicialData";
import { getPresidentData } from "../../data/presidentData";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 10 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.18 } },
};

function resolveAccent(inst, t) {
  if (inst.type === "president") {
    return getPresidentData(t)?.accent ?? inst.accent;
  }
  if (inst.type === "judicial") {
    return getJudicialData(t)?.[inst.id]?.accent ?? inst.accent;
  }
  return getMinistriesData(t)?.[inst.id]?.accent ?? inst.accent;
}

export default function FollowedPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const followed = useFollowStore((s) => s.followed);
  const unfollow = useFollowStore((s) => s.unfollow);

  useEffect(() => {
    if (followed.length === 0) setOpen(false);
  }, [followed.length]);

  if (followed.length === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] bg-black/10 dark:bg-black/30 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 bottom-[68px] z-[201] w-72 color-transition
              bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl
              border border-slate-200/80 dark:border-slate-700/60
              rounded-2xl shadow-2xl shadow-slate-900/25 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3
              border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <BellAlertIcon className="h-3.5 w-3.5 text-indigo-500" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">
                  {t("dashboard.followed.title")}
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                {followed.length}
              </span>
            </div>

            {/* List */}
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="py-2 max-h-80 overflow-y-auto"
            >
              {followed.map((inst) => {
                const accent        = resolveAccent(inst, t);
                const Icon          = ICON_MAP[inst.icon] ?? ICON_MAP["ministry"];
                const gradientClass = ACCENT_MAP[accent]  ?? "from-blue-700 to-blue-500";

                return (
                  <motion.li
                    key={inst.id}
                    variants={itemVariants}
                    className="group relative mx-2 mb-1 last:mb-0"
                  >
                    <button
                      onClick={() => { navigate(inst.path); setOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                        hover:bg-slate-50 dark:hover:bg-slate-800/70
                        transition-all duration-150 cursor-pointer text-left"
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-xl
                        bg-gradient-to-br ${gradientClass}
                        flex items-center justify-center shadow-sm`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>

                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200
                          truncate group-hover:text-indigo-500 dark:group-hover:text-indigo-400
                          transition-colors leading-tight">
                          {inst.titleKey ? t(inst.titleKey, { defaultValue: inst.title }) : inst.title}
                        </span>
                      </span>

                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600
                        opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); unfollow(inst.id, user?.id); }}
                      className="absolute right-8 top-1/2 -translate-y-1/2
                        opacity-0 group-hover:opacity-100 transition-all duration-150
                        w-5 h-5 flex items-center justify-center
                        rounded-full hover:bg-red-100 dark:hover:bg-red-900/30
                        text-slate-300 hover:text-red-500 cursor-pointer"
                      title={t("institution.unfollow")}
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        className={`fixed right-4 bottom-4 z-[202]
          flex items-center justify-center
          w-12 h-12 rounded-2xl shadow-xl cursor-pointer
          transition-all duration-200 color-transition
          ${open
            ? "bg-indigo-500 text-white shadow-indigo-500/50 shadow-lg"
            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-500 hover:border-indigo-300"
          }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {open
              ? <XMarkIcon className="h-5 w-5" />
              : (
                <span className="relative">
                  <BellAlertIcon className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1
                    bg-indigo-500 border-2 border-white dark:border-slate-800
                    text-white text-[9px] font-black rounded-full
                    flex items-center justify-center leading-none">
                    {followed.length}
                  </span>
                </span>
              )
            }
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
