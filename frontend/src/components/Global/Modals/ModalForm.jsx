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
  submitText = "Zapisz",
  cancelText = "Anuluj",
  loading = false,
  status = null,
  steps = null,
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

  const handleClose = () => {
    onClose();
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
            onClick={handleClose}
            className="
              absolute inset-0
              bg-black/70
              backdrop-blur-md
              cursor-pointer
            "
          />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative w-full max-w-md
              rounded-3xl overflow-hidden
              border border-white/10 dark:border-white/10
              bg-gradient-to-b from-white/90 to-white/70
              dark:from-gray-900/90 dark:to-gray-900/70
              backdrop-blur-2xl
              shadow-[0_20px_80px_rgba(0,0,0,0.35)]
              cursor-default
            "
          >

            <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500" />

            <div className="flex items-center justify-between px-6 pt-5 pb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                {title}
              </h2>

              <button
                onClick={handleClose}
                className="
    p-2 rounded-xl
    text-gray-500 dark:text-gray-400
    hover:text-gray-900 dark:hover:text-white
    hover:bg-black/5 dark:hover:bg-white/10
    transition-all duration-200
    cursor-pointer
  "
              >
                ✕
              </button>
            </div>

            <div className="px-6 pb-6">
              {customContent ? (
                customContent
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {fields.map((f) => (
                    <input
                      key={f.name}
                      type={f.type || "text"}
                      value={formData[f.name]}
                      onChange={(e) => handleChange(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      className="
                        w-full px-4 py-3
                        rounded-xl
                        bg-white/70 dark:bg-white/5
                        border border-black/5 dark:border-white/10
                        text-gray-900 dark:text-white
                        placeholder-gray-400
                        outline-none
                        focus:border-violet-500/60
                        focus:ring-2 focus:ring-violet-500/20
                        transition
                        cursor-text
                      "
                    />
                  ))}

                  {status && (
                    <div
                      className={`
                        p-3 rounded-xl text-sm font-medium
                        ${
                          status.type === "error"
                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        }
                      `}
                    >
                      {status.message}
                    </div>
                  )}

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="
                        flex-1 py-3 rounded-xl
                        bg-black/5 dark:bg-white/10
                        hover:bg-black/10 dark:hover:bg-white/15
                        text-gray-700 dark:text-gray-300
                        transition
                        cursor-pointer
                      "
                    >
                      {cancelText}
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        flex-1 py-3 rounded-xl
                        bg-gradient-to-r from-violet-500 to-cyan-500
                        hover:from-violet-600 hover:to-cyan-600
                        text-white font-medium
                        shadow-lg shadow-violet-500/20
                        transition
                        cursor-pointer
                        disabled:opacity-50
                      "
                    >
                      {loading ? "..." : submitText}
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
