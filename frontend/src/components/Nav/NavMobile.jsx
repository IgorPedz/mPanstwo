import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function NavMobile({ isOpen, setIsOpen }) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="color-transition cursor-pointer lg:hidden fixed top-4 right-4 z-[100] p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl border-2 border-slate-800 dark:border-slate-200 shadow-xl color-transition active:scale-90"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isOpen ? "close" : "open"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <XMarkIcon className="h-6 w-6 hover:text-red-500" /> : <Bars3Icon className="h-6 w-6" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}