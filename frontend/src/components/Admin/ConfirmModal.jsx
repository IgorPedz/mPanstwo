import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * variant: "danger" | "warning"
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  variant      = "danger",
  loading      = false,
}) {
  const { t } = useTranslation();
  const resolvedConfirmLabel = confirmLabel ?? t("confirmModal.confirm");
  const resolvedCancelLabel  = cancelLabel  ?? t("confirmModal.cancel");
  if (!isOpen || typeof window === "undefined") return null;

  const accent = variant === "danger"
    ? { dot: "bg-red-500", btn: "bg-red-600 hover:bg-red-700 shadow-red-500/30", icon: "text-red-500", glow: "bg-red-500/10" }
    : { dot: "bg-amber-500", btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/30", icon: "text-amber-500", glow: "bg-amber-500/10" };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="relative w-full sm:max-w-md bg-white dark:bg-slate-900
              rounded-t-[2rem] sm:rounded-[2.5rem]
              shadow-2xl shadow-slate-950/20 dark:shadow-slate-950/60
              border border-slate-200/60 dark:border-slate-800
              z-10 overflow-hidden color-transition"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
          >
            {/* Glow */}
            <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none ${accent.glow}`} />

            {/* Drag handle – mobile only */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 space-y-5">
              {/* Icon + title */}
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${accent.glow} shrink-0`}>
                  {variant === "danger" ? (
                    <svg className={`w-6 h-6 ${accent.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  ) : (
                    <svg className={`w-6 h-6 ${accent.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight color-transition">
                    {title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              {description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed color-transition">
                  {description}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-wide
                    bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    disabled:opacity-50 transition-all cursor-pointer color-transition"
                >
                  {resolvedCancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-wide
                    text-white shadow-lg ${accent.btn}
                    disabled:opacity-50 transition-all cursor-pointer
                    flex items-center justify-center gap-2`}
                >
                  {loading && (
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  )}
                  {resolvedConfirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
