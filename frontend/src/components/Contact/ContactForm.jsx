export default function ContactForm() {
  const inputStyles = `
    w-full p-4 bg-slate-50 dark:bg-slate-800/30
    border border-slate-200 dark:border-slate-800 
    rounded-xl text-slate-900 dark:text-white font-bold
    focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none 
    transition-all color-transition placeholder:text-slate-400 dark:placeholder:text-slate-600
  `;

  return (
    <div className="w-full p-8 md:p-10 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900/50 color-transition">
      <form className="space-y-8 color-transition">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 color-transition">
          {/* Imię */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Imię i Nazwisko
            </label>
            <input type="text" placeholder="Jan Kowalski" className={inputStyles} />
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Adres E-mail
            </label>
            <input type="email" placeholder="jan@kowalski.pl" className={inputStyles} />
          </div>
        </div>

        {/* Wiadomość */}
        <div className="space-y-2 color-transition">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Wiadomość
          </label>
          <textarea 
            rows="5" 
            placeholder="W czym możemy pomóc?" 
            className={`${inputStyles} resize-none`}
          ></textarea>
        </div>

        {/* Przycisk */}
        <div className="pt-4 color-transition">
          <button className="
            w-full md:w-fit px-12 py-4 
            bg-slate-900 dark:bg-white 
            text-white dark:text-slate-900 
            rounded-2xl font-black text-xs uppercase tracking-widest
            hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white
            transition-all cursor-pointer color-transition
            shadow-lg shadow-slate-200 dark:shadow-none
          ">
            Wyślij wiadomość
          </button>
        </div>
      </form>
    </div>
  );
}