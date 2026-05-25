import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NOTIFICATION_MAP from "../../Utils/Maps/Info";

export default function InfoMessage({
  message,
  type = "success",
  onClose,
  duration = 6000,
}) {
  const [visible, setVisible] = useState(false);

  const config = NOTIFICATION_MAP[type] || NOTIFICATION_MAP.info;
  const { base, accent, Icon } = config;

  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  const handleExitComplete = () => {
    if (!visible) onClose?.();
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && message && (
        <div className="fixed top-6 left-0 right-0 z-[99999] flex justify-center px-4 pointer-events-none">
          <motion.div
            key={message}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`
              pointer-events-auto
              relative flex items-center justify-between
              min-w-[320px] max-w-md gap-4
              px-5 py-4 rounded-2xl border
              shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]
              backdrop-blur-xl
              ${base}
            `}
          >
            <div className="absolute bottom-0 left-4 right-4 h-[2px] opacity-20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className={`h-full ${accent}`}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white dark:bg-black/20 shadow-sm">
                <Icon className="h-5 w-5" />
              </div>

              <span className="text-sm font-bold tracking-tight">
                {message}
              </span>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4 opacity-60 hover:opacity-100" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}