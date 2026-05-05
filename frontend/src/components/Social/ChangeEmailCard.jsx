import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ICON_MAP from "../../Utils/Icons";

export default function ChangeEmailCard({ profile, changeEmail }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    email: profile?.email || "",
    password: "",
  });
  const [status, setStatus] = useState(null); // { type, message }
  const [loading, setLoading] = useState(false);

  const EnvelopeIcon = ICON_MAP["contact"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return setStatus({ type: "error", message: "Uzupełnij dane" });
    }

    setLoading(true);
    const res = await changeEmail(form.email, form.password);
    setLoading(false);

    if (res.success) {
      setStatus({ type: "success", message: res.message });
      setForm((prev) => ({ ...prev, password: "" }));

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
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <EnvelopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            Zmień email
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Zaktualizuj swój adres email
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
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Zmień email
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="Nowy email"
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                />

                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Hasło"
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-500"
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
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
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