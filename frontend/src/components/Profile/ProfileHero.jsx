import { motion } from "framer-motion";
import ICON_MAP from "../../Utils/Maps/Icons";

const ProfileHero = ({ profile }) => {
  const ShieldIcon = ICON_MAP["shield"] || ICON_MAP["zap"];

  return (
    <section className="mb-10 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 color-transition">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        <div className="flex items-center gap-6 min-w-[350px]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-4xl font-black shadow-2xl color-transition uppercase">
              {profile?.name?.charAt(0) || "U"}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md border-2 border-white dark:border-slate-900 color-transition uppercase">
              Konto
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none color-transition">
              {profile?.name || "Użytkownik"}
            </h2>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 color-transition flex items-center gap-2">
              <ShieldIcon className="h-3 w-3" /> Status Bezpieczeństwa: Maksymalny
            </span>
            <span className="text-sm font-black text-emerald-500 color-transition uppercase">
              Zweryfikowany
            </span>
          </div>
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 color-transition">
            <motion.div 
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }} animate={{ width: `100%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
            />
          </div>
        </div>

        <div className="flex gap-10">
          {[
            { val: "2024", label: "Dołączył" },
          ].map((item, i) => (
            <div key={i} className={`text-center ${item.border ? 'border-x border-slate-100 dark:border-slate-800 px-10' : ''} color-transition`}>
              <p className="text-2xl font-black text-slate-900 dark:text-white color-transition">{item.val}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest color-transition">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;