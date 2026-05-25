import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import useNoScroll from "../../../Hooks/UseNoScroll";
import { useTranslation } from "react-i18next";
export default function ModalMessage({
  isOpen,
  title = "Potwierdzenie",
  message,
  confirmText = "Potwierdź",
  cancelText = "Anuluj",
  onConfirm,
  onCancel,
}) {
  const { t } = useTranslation();
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

          <motion.div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          <motion.div
            className="relative w-full max-w-md rounded-[2.5rem]
                       bg-white dark:bg-slate-900
                       border border-slate-200 dark:border-slate-800
                       shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]
                       p-10 cursor-default overflow-hidden"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >

            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />

            <div className="flex flex-col items-center text-center mb-8">
              <div className="mb-6 p-5 rounded-3xl bg-red-50 dark:bg-red-500/10 transition-transform group-hover:scale-110">
                <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />
              </div>

              <p className="text-[10px] font-black text-red-500/60 uppercase tracking-[0.2em] mb-1">
                {t("common.authorizationRequired")}
              </p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                {title}
              </h2>
            </div>

            <p className="text-base text-slate-500 dark:text-slate-400 mb-10 leading-relaxed text-center font-medium">
              {message}
            </p>

            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-4 rounded-2xl
                           bg-slate-100 dark:bg-slate-800
                           hover:bg-slate-200 dark:hover:bg-slate-750
                           text-slate-600 dark:text-slate-300
                           font-bold transition-all duration-200
                           cursor-pointer active:scale-95"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-4 rounded-2xl
                           bg-red-500 hover:bg-red-600
                           text-white font-black shadow-lg shadow-red-500/25
                           transition-all duration-200
                           cursor-pointer active:scale-95"
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