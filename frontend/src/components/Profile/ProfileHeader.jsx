const ProfileHeader = () => (
  <header className="flex justify-between items-end border-slate-200 dark:border-slate-800 pb-6 color-transition">
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
        Profil /
      </p>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
        Profil Użytkownika
      </h1>
      <div className="h-1 w-20 bg-indigo-500 mb-5 mt-2 color-transition" />
      <p className="text-slate-400 font-medium color-transition">
        Zarządzaj swoim profilem, przeglądaj osiągnięcia i dostosuj swoje
        ustawienia!
      </p>
    </div>
  </header>
);

export default ProfileHeader;
