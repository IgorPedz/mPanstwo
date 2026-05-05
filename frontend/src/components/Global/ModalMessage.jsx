import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import useNoScroll from "../../Hooks/UseNoScroll";

export default function ModalMessage({
  isOpen,
  title = "Potwierdzenie",
  message,
  confirmText = "Potwierdź",
  cancelText = "Anuluj",
  onConfirm,
  onCancel,
}) {
  useNoScroll(isOpen);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* MODAL */}
          <motion.div
            className="relative w-full max-w-md rounded-2xl
                       bg-white dark:bg-gray-900
                       border border-gray-200 dark:border-gray-800
                       shadow-2xl p-6"
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
              </div>

              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>

            {/* MESSAGE */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {message}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg text-sm
                           bg-gray-200 hover:bg-gray-300
                           dark:bg-gray-800 dark:hover:bg-gray-700
                           text-gray-800 dark:text-white
                           transition"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg text-sm
                           bg-red-500 hover:bg-red-600
                           text-white transition"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}