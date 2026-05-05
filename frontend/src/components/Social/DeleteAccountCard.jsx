import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../Contexts/UserContext";
import ICON_MAP from "../../Utils/Icons";

export default function DeleteAccountCard({ deleteAccount }) {
  const { logout } = useUser();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 = warning, 2 = confirm
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const TrashIcon = ICON_MAP["trash"] || (() => <div />);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!password) {
      return setError("Hasło jest wymagane");
    }

    setLoading(true);
    const res = await deleteAccount(password);
    setLoading(false);

    if (res.success) {
      setTimeout(() => logout(), 1200);
    } else {
      setError(res.message);
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900/30 shadow-md p-4 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
      >
        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <TrashIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            Usuń konto
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ta akcja jest nieodwracalna
          </p>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {step === 1 && (
                <>
                  <h2 className="text-lg font-semibold text-red-600 mb-3">
                    Usuń konto
                  </h2>

                  <p className="text-sm text-red-600/80 mb-5">
                    Ta akcja jest nieodwracalna i usunie wszystkie Twoje dane.
                  </p>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Rozumiem, kontynuuj
                  </button>
                </>
              )}

              {step === 2 && (
                <form onSubmit={handleDelete} className="space-y-3">
                  <p className="text-sm text-red-600 font-semibold">
                    Wpisz hasło aby potwierdzić:
                  </p>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Hasło"
                    className="w-full px-3 py-2 rounded-lg border border-red-300 dark:border-red-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-red-500"
                  />

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        setStep(1);
                        setPassword("");
                        setError("");
                      }}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                    >
                      Anuluj
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
                    >
                      {loading ? "..." : "Usuń"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}