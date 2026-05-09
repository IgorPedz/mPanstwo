import { motion } from "framer-motion";
import { useNotificationStore } from "../../store/useNotificationStore";
import ICON_MAP from "../../Utils/Maps/Icons";
import { itemVariants } from "../../Utils/Animations";

const NotificationItem = ({ notif }) => {
  const markAsRead = useNotificationStore((s) => s.markAsRead);

  const BellIcon = ICON_MAP["bell"] || ICON_MAP["star"];
  const GavelIcon = ICON_MAP["gavel"] || ICON_MAP["star"];

  const isUnread = !Boolean(notif.read);
  console.log(notif)
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
      className={`relative flex items-center gap-6 p-5 rounded-[1.5rem] border cursor-pointer color-transition
        ${
          isUnread
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
        className={`color-transition p-3 rounded-full flex-shrink-0 ${
          notif.urgent
            ? "bg-red-500 text-white"
            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
        }`}
      >
        {notif.type === "law" ? (
          <GavelIcon className="h-5 w-5" />
        ) : (
          <BellIcon className="h-5 w-5" />
        )}
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-3">
          <h4 className="color-transition font-bold text-slate-900 dark:text-white">
            {notif.title}
          </h4>

          {isUnread && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500 text-white uppercase tracking-wider">
              nowe
            </span>
          )}
        </div>

        <p className="color-transition text-sm text-slate-500 dark:text-slate-400 mt-1">
          {notif.body}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          {notif.time}
        </span>
      </div>
    </motion.div>
  );
};

export default NotificationItem;
