import { useState } from "react";
import { motion } from "framer-motion";
import AuthInput from "./AuthInput";

export default function LoginForm({
  formData,
  setFormData,
  errors,
  handleSubmit,
  onSubmit,
  switchToRegister,
}) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleFormSubmit = handleSubmit(
    (data) => onSubmit(data, rememberMe),
    true,
  );

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="space-y-2">
        <AuthInput
          label="Adres Email"
          type="email"
          name="email"
          placeholder="Email"
          formData={formData}
          setFormData={setFormData}
          error={errors.email}
        />

        <AuthInput
          label="Hasło"
          type="password"
          name="password"
          placeholder="Hasło"
          formData={formData}
          setFormData={setFormData}
          error={errors.password}
        />
      </div>

      <div className="flex items-center gap-3 py-2 group cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className=" transition-colors
              peer cursor-pointer appearance-none w-6 h-6
              border-2 border-slate-900 dark:border-slate-100 rounded-lg
              bg-white dark:bg-slate-900
              checked:bg-indigo-500 checked:border-indigo-500
              focus:outline-none transition-all
            "
          />
          <motion.svg
            initial={false}
            animate={{ scale: rememberMe ? 1 : 0, opacity: rememberMe ? 1 : 0 }}
            className="absolute w-4 h-4 text-white pointer-events-none stroke-[4]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </div>

        <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 select-none">
          Pamiętaj mnie na tym urządzeniu
        </span>
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <button
          type="submit"
          className="
            group relative cursor-pointer w-full
            bg-indigo-600 text-white py-5 rounded-2xl
            text-[12px] font-black uppercase tracking-[0.3em]
            border-2 border-slate-900
            transition-all duration-200 active:scale-[0.98] hover:bg-indigo-700
          "
        >
          Zaloguj do systemu
        </button>

        <div className="relative py-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="transition-colors w-full border-t-2 border-slate-100 dark:border-slate-800"></div></div>
          <span className="transition-colors relative px-4 bg-white dark:bg-[#111827] text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Brak konta?
          </span>
        </div>

        <button
          type="button"
          onClick={switchToRegister}
          className="transition-colors
            cursor-pointer w-full
            bg-white dark:bg-slate-900 
            border-2 border-slate-900 dark:border-slate-100
            text-slate-900 dark:text-white py-5 rounded-2xl
            text-[12px] font-black uppercase tracking-[0.3em]
            shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition-all active:scale-[0.98]
          "
        >
          Stwórz nowe konto
        </button>
      </div>
    </form>
  );
}