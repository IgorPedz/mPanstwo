import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ICON_MAP from "../../Utils/Icons";

export default function ChangeNameCard({ profile, updateProfile }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(profile?.name || "");
  const [status, setStatus] = useState(null); // { type, message }
  const [loading, setLoading] = useState(false);

  const UserIcon = ICON_MAP["user"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name?.trim()) {
      return setStatus({ type: "error", message: "Imię jest wymagane" });
    }

    setLoading(true);
    const res = await updateProfile(name);
    setLoading(false);

    if (res.success) {
      setStatus({ type: "success", message: res.message });

      setTimeout(() => {
        setOpen(false);
        setStatus(null);
      }, 1200);
    } else {
      setStatus({ type: "error", message: res.message });
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
      >
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            Zmień imię
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Zaktualizuj swoje imię wyświetlane na platformie
          </p>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
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
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Zmień imię
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Twoje imię i nazwisko"
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-indigo-500"
                />

                {status && (
                  <p
                    className={`text-sm ${
                      status.type === "error"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {status.message}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                  >
                    Anuluj
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50"
                  >
                    {loading ? "..." : "Zapisz"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}