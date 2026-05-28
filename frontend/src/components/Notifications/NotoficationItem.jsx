import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BellIcon } from "@heroicons/react/24/outline";

import { useNotificationStore } from "../../store/useNotificationStore";

import ICON_MAP from "../../Utils/Maps/Icons";
import { itemVariants } from "../../Utils/Animations";

import { getNotificationContent } from "./GetNotificationContent";

import { NOTIFICATION_COLOR_MAP as colorClassMap } from "../../Utils/Maps/Colors";

const normalizeIcon = (icon) =>
  icon?.toLowerCase?.().trim?.() ?? "";

const NotificationItem = ({ notif }) => {
  const { t } = useTranslation();
  const markAsRead = useNotificationStore((s) => s.markAsRead);

  const { title, body } = getNotificationContent(notif, t);

  const Icon =
    ICON_MAP[normalizeIcon(notif.icon)] || BellIcon;

  const isUnread = !Boolean(notif.read);

  const badgeClass =
    colorClassMap[notif?.color?.toLowerCase?.()] ||
    (notif.urgent
      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300"
      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300");

  const handleClick = () => {
    const id = Number(notif.id);

    if (!Number.isFinite(id)) {
      console.error("❌ INVALID ID:", notif.id);
      return;
    }

    markAsRead(id);
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 6, scale: 1.01 }}
      onClick={handleClick}
      className={`
        relative flex items-center gap-6 p-5 rounded-[1.5rem]
        border cursor-pointer color-transition

        ${isUnread
          ? "bg-blue-50/70 dark:bg-blue-900/10 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-60"
        }
      `}
    >
      {isUnread && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute left-2 top-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"
        />
      )}

      <div
        className={`p-3 rounded-full flex-shrink-0 color-transition ${badgeClass}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white color-transition">
            {title}
          </h4>

          {isUnread && (
            <span
              className="
                text-[10px]
                px-2 py-0.5
                rounded-full
                bg-blue-500
                text-white
                uppercase
                tracking-wider
              "
            >
              {t("notifications.new")}
            </span>
          )}
        </div>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 color-transition">
          {body}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <span className="text-[10px] font-bold uppercase text-slate-400">
          {notif.time}
        </span>
      </div>
    </motion.div>
  );
};

export default NotificationItem;