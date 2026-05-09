import { useState } from "react";
import axios from "axios";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputStyles = `
    w-full p-4 bg-slate-50 dark:bg-slate-800/30
    border border-slate-200 dark:border-slate-800 
    rounded-xl text-slate-900 dark:text-white font-bold
    focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none 
    transition-all color-transition placeholder:text-slate-400 dark:placeholder:text-slate-600
  `;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/contact", form);

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Nie udało się wysłać wiadomości");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8 md:p-10 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900/50 color-transition">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 color-transition"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 color-transition">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Imię i Nazwisko
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jan Kowalski"
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Adres E-mail
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jan@kowalski.pl"
              className={inputStyles}
              required
            />
          </div>
        </div>

        <div className="space-y-2 color-transition">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Wiadomość
          </label>

          <textarea
            rows="5"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="W czym możemy pomóc?"
            className={`${inputStyles} resize-none`}
            required
          />
        </div>

        <div className="pt-4 color-transition">
          <button
            type="submit"
            disabled={loading}
            className="
              w-full md:w-fit px-12 py-4 
              bg-slate-900 dark:bg-white 
              text-white dark:text-slate-900 
              rounded-2xl font-black text-xs uppercase tracking-widest
              hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white
              transition-all cursor-pointer color-transition
              shadow-lg shadow-slate-200 dark:shadow-none
              disabled:opacity-50
            "
          >
            {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
          </button>

          {success && (
            <p className="mt-4 text-sm font-bold text-emerald-500">
              Wiadomość została wysłana ✨
            </p>
          )}
        </div>
      </form>
    </div>
  );
}