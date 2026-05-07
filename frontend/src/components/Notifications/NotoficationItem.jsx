import { motion } from "framer-motion";
import ICON_MAP from "../../Utils/Maps/Icons";
import { itemVariants } from "../../Utils/Animations";

const NotificationItem = ({ notif }) => {
  const BellIcon = ICON_MAP["bell"] || ICON_MAP["star"];
  const GavelIcon = ICON_MAP["gavel"] || ICON_MAP["star"];

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 5 }} 
      className={`flex items-center gap-6 p-5 rounded-[1.5rem] border color-transition ${
        notif.urgent 
        ? "bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30" 
        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md"
      }`}
    >

      <div className={`p-3 rounded-full flex-shrink-0 color-transition ${
        notif.urgent ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
      }`}>
        {notif.type === "law" ? (
          <GavelIcon className="h-5 w-5 color-transition" /> 
        ) : (
          <BellIcon className="h-5 w-5 color-transition" />
        )}
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white color-transition leading-none">
            {notif.title}
          </h4>
          {notif.urgent && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 color-transition mt-1">
          {notif.body}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest color-transition">
          {notif.time}
        </span>
      </div>
    </motion.div>
  );
};

export default NotificationItem;