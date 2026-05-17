import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "../../components/Global/Logo";
import AuthInput from "../../components/Auth/Reset/ResetInput";

import useResetPassword from "../../hooks/useResetPassword";

import { containerVariants } from "../../Utils/Animations";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { loading, message, resetPassword } = useResetPassword(token, navigate);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(password, repeatPassword);
  };

  return (
    <motion.div
      className="
        relative min-h-screen overflow-hidden
        bg-slate-50 dark:bg-slate-950
        flex items-center justify-center
        px-4 py-10
      "
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="
            bg-white/90 dark:bg-slate-900/90
            backdrop-blur-xl
            border border-slate-200 dark:border-slate-800
            rounded-[2rem]
            shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)]
            overflow-hidden
          "
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

          <div className="p-8 md:p-10">
            <div className="flex justify-center mb-8">
              <Logo />
            </div>

            <div className="text-center mb-8">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-2">
                Bezpieczeństwo konta
              </p>

              <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
                Reset Hasła
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                Ustaw nowe hasło do swojego konta i odzyskaj dostęp do systemu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthInput
                label="Nowe Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wprowadź nowe hasło"
              />

              <AuthInput
                label="Powtórz Hasło"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Powtórz nowe hasło"
              />

              {message && (
                <div
                  className={`
                    text-sm font-semibold text-center pt-1
                    ${
                      message.type === "error"
                        ? "text-red-500"
                        : "text-emerald-500"
                    }
                  `}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  cursor-pointer
                  w-full py-4 rounded-2xl
                  bg-slate-900 dark:bg-white
                  text-white dark:text-slate-900
                  font-black uppercase tracking-[0.2em]
                  transition-all duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  disabled:opacity-50
                "
              >
                {loading ? "ZMIANA HASŁA..." : "ZMIEŃ HASŁO"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
