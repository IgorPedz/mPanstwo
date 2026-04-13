import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function InfoMessage({
  message,
  type = "success",
  onClose,
  duration = 4000,
}) {
  const [show, setShow] = useState(false);

  const config = {
    success: { color: "bg-green-100 text-green-800", Icon: CheckCircleIcon },
    error: { color: "bg-red-100 text-red-800", Icon: XMarkIcon },
    info: { color: "bg-blue-100 text-blue-800", Icon: InformationCircleIcon },
  }[type];

  const { color, Icon } = config;

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
        <motion.div
          key={message}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className={`flex items-center justify-between p-3 rounded mb-4 shadow ${color}`}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{message}</span>
          </div>

          <button onClick={() => setShow(false)}>
            <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-red-700" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}