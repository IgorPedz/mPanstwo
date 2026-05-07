import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function InfoMessage({
  message,
  type = "success",
  onClose,
  duration = 4000,
}) {
  const [show, setShow] = useState(false);

  const config = {
    success: { 
      base: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400", 
      accent: "bg-emerald-500",
      Icon: CheckCircleIcon 
    },
    error: { 
      base: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400", 
      accent: "bg-red-500",
      Icon: XMarkIcon 
    },
    info: { 
      base: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400", 
      accent: "bg-blue-500",
      Icon: InformationCircleIcon 
    },
    warning: { 
      base: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400", 
      accent: "bg-amber-500",
      Icon: ExclamationCircleIcon 
    },
  }[type] || config.info;

  const { base, accent, Icon } = config;

  useEffect(() => {
    if (!message) return;
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  return (
    <AnimatePresence onExitComplete={() => onClose?.()}>
      {show && message && (
        <div className="fixed top-6 left-0 right-0 z-[10000] flex justify-center pointer-events-none px-4">
          <motion.div
            key={message}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`
              pointer-events-auto
              relative flex items-center justify-between 
              min-w-[320px] max-w-md gap-4 
              px-5 py-4 rounded-2xl border
              shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)]
              backdrop-blur-xl ${base}
            `}
          >
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`absolute bottom-0 left-4 right-4 h-[2px] opacity-20 rounded-full ${accent}`}
            />

            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-white dark:bg-black/20 shadow-sm`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">{message}</span>
              </div>
            </div>

            <button 
              onClick={() => setShow(false)}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4 opacity-50 hover:opacity-100" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}