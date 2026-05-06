import { motion, AnimatePresence } from "framer-motion";
import ICON_MAP from "../../../Utils/Maps/Icons";

export default function DashboardActions({ saveLayout, loadSavedLayout, isVisible = true }) {
  const SaveIcon = ICON_MAP["check"];
  const CancelIcon = ICON_MAP["cancel"];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="color-transition fixed bottom-10 left-1/2 z-[100] flex items-center gap-2 p-2 
                     bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
                     border border-gray-200 dark:border-gray-800
                     rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadSavedLayout}
            className="group flex items-center gap-2 px-5 py-3 rounded-full
                       text-gray-500 dark:text-gray-400 font-bold text-sm
                       hover:bg-gray-100 dark:hover:bg-gray-800 color-transition cursor-pointer"
          >
            <CancelIcon className="h-5 w-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
            <span>Anuluj</span>
          </motion.button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveLayout}
            className="color-transition  flex items-center gap-2 px-6 py-3 rounded-full
                       bg-blue-600 text-white font-bold text-sm
                       shadow-lg shadow-blue-500/30 hover:bg-blue-500 
                       transition-all active:shadow-inner cursor-pointer"
          >
            <span>Zapisz zmiany</span>
            <SaveIcon className="h-5 w-5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}