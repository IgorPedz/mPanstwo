import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalMessage({
  isOpen,
  title = "Potwierdzenie",
  message,
  confirmText = "Potwierdź",
  cancelText = "Anuluj",
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/90 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6">
              
              <div className="flex items-center gap-3 mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                <h2 className="text-lg font-semibold dark:text-gray-100">{title}</h2>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-200 mb-6">
                {message}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="cursor-pointer px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 dark:bg-white dark:hover:bg-gray-300 dark:text-gray-900 transition"
                >
                  {cancelText}
                </button>

                <button
                  onClick={onConfirm}
                  className="cursor-pointer px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition dark:bg-red-700 dark:hover:bg-red-900"
                >
                  {confirmText}
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}