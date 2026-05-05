import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ICON_MAP from "../../Utils/Icons";

export default function ChangePasswordCard({ changePassword }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [status, setStatus] = useState(null); // { type, message }
  const [loading, setLoading] = useState(false);

  const LockIcon = ICON_MAP["lock"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.old || !form.new || !form.confirm) {
      return setStatus({ type: "error", message: "Uzupełnij wszystkie pola" });
    }

    if (form.new !== form.confirm) {
      return setStatus({ type: "error", message: "Hasła się nie zgadzają" });
    }

    if (form.new.length < 6) {
      return setStatus({ type: "error", message: "Min. 6 znaków" });
    }

    setLoading(true);
    const res = await changePassword(form.old, form.new);
    setLoading(false);

    if (res.success) {
      setStatus({ type: "success", message: res.message });
      setForm({ old: "", new: "", confirm: "" });

      setTimeout(() => {
        setOpen(false);
        setStatus(null);
      }, 1500);
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
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <LockIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            Zmień hasło
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Zaktualizuj hasło do konta
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
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Zmień hasło
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="password"
                  value={form.old}
                  onChange={(e) =>
                    setForm({ ...form, old: e.target.value })
                  }
                  placeholder="Stare hasło"
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                />

                <input
                  type="password"
                  value={form.new}
                  onChange={(e) =>
                    setForm({ ...form, new: e.target.value })
                  }
                  placeholder="Nowe hasło"
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                />

                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  placeholder="Potwierdź nowe hasło"
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-purple-500"
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
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    Anuluj
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
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