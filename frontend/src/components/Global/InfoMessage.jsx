import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NOTIFICATION_MAP from "../../Utils/Maps/Info";

export default function InfoMessage({
  message,
  type = "success",
  onClose,
  duration = 6000,
}) {
  const [show, setShow] = useState(false);

  const config = NOTIFICATION_MAP[type] || NOTIFICATION_MAP.info;
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
            {/* progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`absolute bottom-0 left-4 right-4 h-[2px] opacity-20 rounded-full ${accent}`}
            />

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white dark:bg-black/20 shadow-sm">
                <Icon className="h-5 w-5" />
              </div>

              <span className="text-sm font-bold tracking-tight">
                {message}
              </span>
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