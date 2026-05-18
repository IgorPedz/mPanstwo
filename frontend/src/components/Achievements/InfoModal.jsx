import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { reputationSources } from "./AchievementsData";

const InfoModal = ({ isOpen, onClose }) => {
    if (!isOpen || typeof window === "undefined") return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-md cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl shadow-slate-950/10 dark:shadow-slate-950/50 border border-slate-200/60 dark:border-slate-800 z-10 text-slate-900 dark:text-white relative overflow-hidden color-transition"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 color-transition">
                        <span className="p-2 rounded-xl text-blue-600 text-lg color-transition">⚡</span>
                        Zarabianie XP
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-red-700 dark:hover:text-red-500 cursor-pointer color-transition"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                    <p className="font-medium text-slate-500 dark:text-slate-400 color-transition">Zwiększaj swoją pozycję w rankingu wykonując poniższe aktywności na platformie:</p>

                    <div className="space-y-2.5">
                        {reputationSources.map((item, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-blue-50/40 hover:bg-blue-50/80 dark:bg-blue-950/10 dark:hover:bg-blue-950/20 border border-blue-100/40 dark:border-blue-950/30 color-transition">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-0.5 color-transition">{item.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 color-transition">{item.desc}</p>
                                </div>
                                <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-500/20 px-2.5 py-1 rounded-lg shrink-0 color-transition">{item.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="
        mt-8 px-6 py-3 w-full
        bg-slate-900 dark:bg-white
        text-white dark:text-slate-900
        rounded-2xl
        font-black text-xs uppercase
        cursor-pointer
        hover:scale-[1.02]
        active:scale-[0.98]
        transition
      "
                >
                    Świetnie
                </button>
            </motion.div>
        </div>,
        document.body
    );
};

export default InfoModal;