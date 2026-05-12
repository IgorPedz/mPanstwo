import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"
import InfoMessage from "../Global/InfoMessage"

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("")
  const [infoType, setInfoType] = useState("")
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

      await axios.post("http://localhost:5000/support", form);

      setInfoMessage("Wysłano wiadomość!")
      setInfoType("success")
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

        <div className="pt-4 color-transition flex justify-center">
          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="
            color-transition px-10 py-5
            bg-slate-900 dark:bg-white
            text-white dark:text-slate-900
            rounded-2xl
            font-black text-[12px] uppercase tracking-widest
            shadow-lg
            hover:shadow-xl hover:shadow-blue-500/10
            transition-all
            cursor-pointer
          "
          >
            Wyślij wiadomość
          </motion.button>
        </div>
      </form>
      {infoMessage && (
        <InfoMessage
          message={infoMessage}
          type={infoType}
          onClose={() => setInfoMessage("")}
        />
      )}
    </div>
  );
}