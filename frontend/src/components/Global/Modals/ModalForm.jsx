import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import useNoScroll from "../../../Hooks/useNoScroll";

export default function ModalForm({
  isOpen,
  onClose,
  title,
  fields = [],
  onSubmit,
  submitText = "Zapisz zmiany",
  cancelText = "Anuluj",
  loading = false,
  status = null,
  customContent = null,
}) {
  useNoScroll(isOpen);

  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue || "" }), {}),
  );

  const handleChange = (name, value) => {
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

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
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl cursor-pointer"
          />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="
              relative w-full max-w-md
              rounded-[2.5rem] overflow-hidden
              border border-slate-200 dark:border-slate-800
              bg-white dark:bg-slate-900
              shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]
              cursor-default
            "
          >

            <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />

            <div className="px-8 pt-8 pb-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                    Konfiguracja Systemu
                  </p>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {title}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="
                    p-3 rounded-2xl
                    text-slate-400 hover:text-red-900 dark:hover:text-red
                    bg-slate-50 dark:bg-slate-800
                    hover:scale-110 active:scale-95
                    transition-all duration-200
                    cursor-pointer 
                  "
                >
                  ✕
                </button>
              </div>

              {customContent ? (
                <div className="mb-6">{customContent}</div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    {fields.map((f) => (
                      <div key={f.name}>
                        <input
                          type={f.type || "text"}
                          value={formData[f.name]}
                          onChange={(e) => handleChange(f.name, e.target.value)}
                          placeholder={f.placeholder}
                          className="
                            w-full px-6 py-4
                            rounded-2xl
                            bg-slate-50 dark:bg-slate-800/50
                            border border-slate-100 dark:border-slate-800
                            text-slate-900 dark:text-white
                            placeholder-slate-400
                            outline-none
                            focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500
                            transition-all duration-300
                            cursor-text
                          "
                        />
                      </div>
                    ))}
                  </div>

                  {status && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={`
                        p-4 rounded-2xl text-sm font-bold tracking-tight
                        ${
                          status.type === "error"
                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        }
                      `}
                    >
                      {status.message}
                    </motion.div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="
                        flex-[0.8] py-4 rounded-2xl
                        bg-slate-100 dark:bg-slate-800
                        hover:bg-red-200 dark:hover:bg-red-400
                        text-slate-600 dark:text-slate-300 font-bold
                        transition-all duration-200
                        cursor-pointer
                      "
                    >
                      {cancelText}
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        flex-1 py-4 rounded-2xl
                        bg-slate-900 dark:bg-white
                        text-white dark:text-slate-900 font-black
                        shadow-xl shadow-slate-900/10 dark:shadow-white/5
                        hover:scale-[1.02] active:scale-[0.98]
                        transition-all duration-200
                        cursor-pointer
                        disabled:opacity-50
                      "
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-.15s]" />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-.3s]" />
                        </div>
                      ) : (
                        submitText
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}