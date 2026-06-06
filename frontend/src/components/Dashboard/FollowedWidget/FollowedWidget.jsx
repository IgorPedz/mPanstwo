import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BellAlertIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useFollowStore } from "../../../store/useFollowStore";
import { useUser } from "../../../Contexts/UserContext";
import ICON_MAP from "../../../Utils/Maps/Icons";
import { COLOR_MAP } from "../../../Utils/Maps/Colors";

export default function FollowedWidget() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();
  const followed = useFollowStore((s) => s.followed);
  const unfollow = useFollowStore((s) => s.unfollow);

  if (followed.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="mb-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <BellAlertIcon className="h-3.5 w-3.5 text-indigo-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 color-transition">
          {t("dashboard.followed.title")}
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <AnimatePresence>
          {followed.map((inst) => {
            const Icon = ICON_MAP[inst.icon] ?? ICON_MAP["ministry"];
            const colorClass = COLOR_MAP[inst.accent] ?? "text-blue-700";

            return (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="relative group flex-shrink-0"
              >
                <button
                  onClick={() => navigate(inst.path)}
                  className="flex items-center gap-2 pl-3 pr-7 py-1.5 rounded-full
                    bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                    hover:border-indigo-400 dark:hover:border-indigo-500
                    text-xs font-semibold text-slate-700 dark:text-slate-200
                    transition-all duration-200 color-transition cursor-pointer"
                >
                  <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${colorClass}`} />
                  <span className="max-w-[120px] truncate">{inst.title}</span>
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); unfollow(inst.id, user?.id); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    opacity-0 group-hover:opacity-100 transition-opacity
                    text-slate-400 hover:text-red-500 cursor-pointer"
                  title={t("institution.unfollow")}
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
