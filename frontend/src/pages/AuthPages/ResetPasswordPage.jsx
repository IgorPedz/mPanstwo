import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../components/Global/Logo"
import { containerVariants } from "../../Utils/Animations";

export default function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            return setMessage({
                type: "error",
                text: "Hasła nie są takie same",
            });
        }

        try {
            setLoading(true);
            setMessage(null);

            const res = await fetch("http://localhost:5000/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Błąd resetu hasła");
            }

            setMessage({
                type: "success",
                text: "Hasło zostało zmienione",
            });

            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setMessage({
                type: "error",
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="w-full min-h-screen py-8 px-4 md:px-8 color-transition bg-slate-50 dark:bg-slate-950"
            initial="hidden"
            animate="show"
            variants={containerVariants}
        >
            <div className="max-w-[900px] mx-auto">

                <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6 mb-10">

                    <Logo />

                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                            Reset hasła
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Wprowadź nowe hasło do swojego konta
                        </p>
                    </div>

                </header>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-7 shadow-lg max-w-md mx-auto">

                    <form onSubmit={handleReset} className="space-y-5">

                        <div>
                            <label className="text-xs font-bold uppercase text-slate-500">
                                Nowe hasło
                            </label>
                            <input
                                type="password"
                                className="w-full mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none border border-slate-200 dark:border-slate-700 focus:border-indigo-500 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase text-slate-500">
                                Powtórz hasło
                            </label>
                            <input
                                type="password"
                                className="w-full mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none border border-slate-200 dark:border-slate-700 focus:border-indigo-500 transition"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>

                        {message && (
                            <div
                                className={`text-sm font-medium ${message.type === "error"
                                    ? "text-red-500"
                                    : "text-emerald-500"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer
                w-full py-4 rounded-2xl
                bg-indigo-600 hover:bg-indigo-700
                text-white font-black uppercase tracking-widest
                transition-all active:scale-[0.98]
                disabled:opacity-50
              "
                        >
                            {loading ? "Zmiana hasła..." : "Zmień hasło"}
                        </button>

                    </form>
                </div>

            </div>
        </motion.div>
    );
}