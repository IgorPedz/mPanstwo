import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function ArchiveResultsModal({ survey, onClose }) {
  if (!survey) return null;

  const isExpired = survey?.deadline
    ? new Date(survey.deadline).getTime() < Date.now()
    : false;

  const rawData = isExpired ? survey?.stats : survey?.answers;

  const getData = () => {
    if (!rawData) return {};
    try {
      return typeof rawData === "string" ? JSON.parse(rawData) : rawData;
    } catch {
      return {};
    }
  };

  const data = getData();
  const questions = survey?.questions || [];

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
      />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }} // 🔥 TO TERAZ DZIAŁA
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
      >
        <div
          className={`h-2 w-full ${isExpired ? "bg-amber-500" : "bg-blue-600"}`}
        />

        <div className="p-8">
          {/* HEADER */}
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {survey.title}
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            {isExpired ? "Wyniki zbiorcze" : "Twoje odpowiedzi"}
          </p>
          {!isExpired && (
            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 mt-6">
              {questions.length > 0 ? (
                questions.map((q, index) => {
                  const answer = data[q.id];

                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800"
                    >
                      <p className="text-[10px] uppercase text-slate-400 font-bold">
                        Pytanie {index + 1}
                      </p>

                      <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                        {q.title}
                      </p>

                      <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {answer ?? "Brak odpowiedzi"}
                      </p>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400">Brak danych</p>
              )}
            </div>
          )}
          {isExpired && (
            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 mt-6">
              {Object.entries(data).length > 0 ? (
                Object.entries(data).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800"
                  >
                    <p className="text-[10px] uppercase text-slate-400 font-bold">
                      Opcja
                    </p>

                    <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                      {key}
                    </p>

                    <p className="mt-2 text-sm text-blue-600 font-black">
                      {value}%
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-xs text-slate-400">Brak statystyk</p>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="cursor-pointer mt-8 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase"
          >
            Zamknij
          </button>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
