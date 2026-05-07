import { motion, AnimatePresence } from "framer-motion";

export default function AuthInput({
  label,
  type = "text",
  name,
  placeholder,
  formData,
  setFormData,
  error,
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isError = !!error;

  return (
    <div className="flex flex-col gap-2 mb-6 color-transition group">
      {label && (
        <label 
          htmlFor={name} 
          className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-indigo-500 transition-colors"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={
            type === "password"
              ? "current-password"
              : type === "email"
              ? "email"
              : "off"
          }
          className={`
            transition-colors w-full px-5 py-4 rounded-2xl border-2 color-transition outline-none
            text-sm font-bold tracking-wide
            ${isError 
              ? "bg-red-50 dark:bg-red-950/20 border-red-500 text-red-900 dark:text-red-200" 
              : "bg-white dark:bg-slate-900 border-slate-900 dark:border-slate-100 text-slate-900 dark:text-white"
            }
            placeholder:text-slate-400 dark:placeholder:text-slate-600
          `}
          aria-invalid={isError}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            id={`${name}-error`}
            className="transition-colors text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-red-400 mt-1 flex items-center gap-1"
          >
            <span className="w-1 h-1 bg-red-600 dark:bg-red-400 rounded-full" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}