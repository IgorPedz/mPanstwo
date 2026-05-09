const NotificationsHeader = ({ onClearHistory }) => (
  <header className="mb-12 flex items-center justify-between">
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
        Profil /
      </p>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
        Powiadomienia
      </h1>
      <div className="h-1 w-20 bg-indigo-500 mb-5 mt-2 color-transition" />
      <p className="text-slate-400 font-medium color-transition">
        Tu znajdziesz wszystko w czym brałeś udział!
      </p>
    </div>
    <button
      onClick={onClearHistory}
      className="cursor-pointer text-xs font-bold uppercase tracking-widest text-blue-600 border border-blue-600/20 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all color-transition"
    >
      Wyczyść historię
    </button>
  </header>
);

export default NotificationsHeader;
