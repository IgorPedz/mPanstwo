import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { useFollowStore } from "../../store/useFollowStore";
import { useUser } from "../../Contexts/UserContext";

const ACCENT_BUTTON = {
  blue:              "bg-blue-700     border-blue-700     shadow-blue-700/30",
  indigo:            "bg-indigo-700   border-indigo-700   shadow-indigo-700/30",
  purple:            "bg-purple-700   border-purple-700   shadow-purple-700/30",
  emerald:           "bg-emerald-700  border-emerald-700  shadow-emerald-700/30",
  orange:            "bg-orange-600   border-orange-600   shadow-orange-600/30",
  rose:              "bg-rose-700     border-rose-700     shadow-rose-700/30",
  green:             "bg-green-700    border-green-700    shadow-green-700/30",
  gray:              "bg-gray-700     border-gray-700     shadow-gray-700/30",
  red:               "bg-red-700      border-red-700      shadow-red-700/30",
  pink:              "bg-pink-700     border-pink-700     shadow-pink-700/30",
  yellow:            "bg-yellow-600   border-yellow-600   shadow-yellow-600/30",
  cyan:              "bg-cyan-700     border-cyan-700     shadow-cyan-700/30",
  teal:              "bg-teal-700     border-teal-700     shadow-teal-700/30",
  "amber-gradient":  "bg-amber-600    border-amber-600    shadow-amber-600/30",
  "purple-gradient": "bg-purple-700   border-purple-700   shadow-purple-700/30",
  "sky-gradient":    "bg-sky-600      border-sky-600      shadow-sky-600/30",
  "emerald-gradient":"bg-emerald-600  border-emerald-600  shadow-emerald-600/30",
  "red-gradient":    "bg-red-600      border-red-600      shadow-red-600/30",
  "orange-gradient": "bg-orange-500   border-orange-500   shadow-orange-500/30",
  "pink-gradient":   "bg-pink-600     border-pink-600     shadow-pink-600/30",
  "cyan-gradient":   "bg-cyan-600     border-cyan-600     shadow-cyan-600/30",
  "rose-gradient":   "bg-rose-600     border-rose-600     shadow-rose-600/30",
  "slate-gradient":  "bg-slate-700    border-slate-700    shadow-slate-700/30",
  "lime-gradient":   "bg-lime-600     border-lime-600     shadow-lime-600/30",
};

export default function FollowButton({ institution }) {
  const { t } = useTranslation();
  const { user } = useUser();
  const isFollowed  = useFollowStore((s) => s.isFollowed(institution.id));
  const toggleFollow = useFollowStore((s) => s.toggleFollow);

  const activeClass = ACCENT_BUTTON[institution.accent] ?? ACCENT_BUTTON.indigo;

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => toggleFollow(institution, user?.id)}
      className={`
        inline-flex items-center gap-1.5 rounded-full
        border transition-all duration-200 cursor-pointer color-transition
        px-2 py-2 sm:px-3 sm:py-1.5
        text-xs font-bold uppercase tracking-wider
        ${isFollowed
          ? `text-white shadow-md ${activeClass}`
          : "border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
        }
      `}
      title={isFollowed ? t("institution.unfollow") : t("institution.follow")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isFollowed ? "on" : "off"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center"
        >
          {isFollowed
            ? <BellAlertIcon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
            : <BellIcon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
          }
        </motion.span>
      </AnimatePresence>
      <span className="hidden sm:inline">
        {isFollowed ? t("institution.following") : t("institution.follow")}
      </span>
    </motion.button>
  );
}
