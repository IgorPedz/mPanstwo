import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { useFollowStore } from "../../store/useFollowStore";
import { useUser } from "../../Contexts/UserContext";

export default function FollowButton({ institution }) {
  const { t } = useTranslation();
  const { user } = useUser();
  const isFollowed = useFollowStore((s) => s.isFollowed(institution.id));
  const toggleFollow = useFollowStore((s) => s.toggleFollow);

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => toggleFollow(institution, user?.id)}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
        border transition-all duration-200 cursor-pointer color-transition
        ${isFollowed
          ? "bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-500/30"
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
            ? <BellAlertIcon className="h-3.5 w-3.5" />
            : <BellIcon className="h-3.5 w-3.5" />
          }
        </motion.span>
      </AnimatePresence>
      <span>
        {isFollowed ? t("institution.following") : t("institution.follow")}
      </span>
    </motion.button>
  );
}
