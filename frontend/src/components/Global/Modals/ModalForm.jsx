import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import useNoScroll from "../../../Hooks/UseNoScroll";

export default function ModalForm({
  isOpen,
  onClose,
  title,
  fields = [],
  onSubmit,
  submitText = "common.saveChanges",
  cancelText = "common.cancel",
  loading = false,
  status = null,
  customContent = null,
}) {
  const { t } = useTranslation();

  useNoScroll(isOpen);

  const createInitialState = () => {
    const state = {};

    fields.forEach((f) => {
      state[f.name] = f.defaultValue || "";
    });

    return state;
  };

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData(createInitialState());
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (name, value) => {
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};

    fields.forEach((f) => {
      if (!formData[f.name]?.trim()) {
        newErrors[f.name] = t("validation.requiredField", {
          field: t(f.label || f.name).toUpperCase(),
        });
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleClick = async () => {
    if (!validate()) return;

    await onSubmit(formData);
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center px-4
            pointer-events-none
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={onClose}
            className="
              absolute inset-0
              bg-black/60 dark:bg-black/70
              backdrop-blur-xl
              pointer-events-auto
            "
          />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="
              relative w-full max-w-md
              rounded-3xl
              overflow-hidden
              border border-slate-200 dark:border-slate-800
              bg-white dark:bg-slate-900
              shadow-2xl
              pointer-events-auto
              transition-colors duration-300
            "
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />

            <div className="px-8 pt-8 pb-6">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {t("common.configuration")}
                  </p>

                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                    {t(title)}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    cursor-pointer
                    group p-3 rounded-2xl
                    bg-slate-100 dark:bg-slate-800
                    hover:bg-red-500/10
                    transition-all duration-200
                    active:scale-95
                  "
                >
                  <svg
                    className="
                      w-5 h-5
                      text-slate-500 dark:text-slate-300
                      group-hover:text-red-500
                      transition-colors duration-200
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {customContent ? (
                <div>{customContent}</div>
              ) : (
                <div className="space-y-5">
                  {fields.map((f) => (
                    <div key={f.name} className="space-y-1">
                      {f.renderBelow?.({ formData, errors })}

                      <input
                        type={f.type || "text"}
                        value={formData[f.name] || ""}
                        onChange={(e) =>
                          handleChange(f.name, e.target.value)
                        }
                        placeholder={t(f.placeholder)}
                        className={`
                          w-full px-5 py-4
                          rounded-2xl
                          bg-slate-50 dark:bg-slate-800/50
                          border
                          text-slate-900 dark:text-white
                          outline-none
                          transition-all duration-300
                          focus:ring-4 focus:ring-indigo-500/10
                          focus:border-indigo-500
                          ${
                            errors[f.name]
                              ? "border-red-500"
                              : "border-slate-200 dark:border-slate-800"
                          }
                        `}
                      />

                      {errors[f.name] && (
                        <p className="text-[11px] font-black tracking-widest text-red-500">
                          {errors[f.name]}
                        </p>
                      )}
                    </div>
                  ))}

                  {status && (
                    <p
                      className={`text-xs font-black tracking-widest ${
                        status.type === "error"
                          ? "text-red-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {t(status.message).toUpperCase()}
                    </p>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="
                        cursor-pointer
                        flex-[0.8] py-4 rounded-2xl
                        bg-slate-100 dark:bg-slate-800
                        text-slate-600 dark:text-slate-300 font-bold
                        hover:bg-slate-200 dark:hover:bg-slate-700
                        transition-all duration-200
                      "
                    >
                      {t(cancelText)}
                    </button>

                    <button
                      type="button"
                      onClick={handleClick}
                      disabled={loading}
                      className="
                        cursor-pointer
                        flex-1 py-4 rounded-2xl
                        bg-slate-900 dark:bg-white
                        text-white dark:text-slate-900 font-black
                        hover:scale-[1.02]
                        active:scale-[0.98]
                        transition-all duration-200
                        disabled:opacity-50
                      "
                    >
                      {loading
                        ? t("common.loading")
                        : t(submitText)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}