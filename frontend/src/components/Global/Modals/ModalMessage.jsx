import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import useNoScroll from "../../../Hooks/UseNoScroll";

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

          <motion.div
            className="relative w-full max-w-md rounded-3xl
                       bg-white dark:bg-gray-900
                       border border-gray-200/50 dark:border-gray-700/50
                       shadow-2xl shadow-black/10 dark:shadow-black/40
                       p-8 backdrop-blur-xl"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {title}
                </h2>
              </div>
              <button
                onClick={onCancel}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {message}
            </p>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 rounded-xl
                           bg-gray-100 dark:bg-gray-800
                           hover:bg-gray-200 dark:hover:bg-gray-700
                           text-gray-700 dark:text-gray-300
                           font-medium transition-all duration-200
                           cursor-pointer"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-3 rounded-xl
                           bg-red-500 hover:bg-red-600
                           text-white font-medium
                           transition-all duration-200
                           cursor-pointer"
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