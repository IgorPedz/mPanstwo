import ICONS_MAP from "../../Utils/Maps/Icons";

export default function ContactInfoCard({ contactInfo }) {
  const { icon, label, value } = contactInfo;
  const IconComponent = icon ? ICONS_MAP[icon] : null;
  return (
    <div className="group relative w-full p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] transition-all duration-200 hover:border-slate-900 dark:hover:border-slate-100 overflow-hidden color-transition">
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none color-transition z-20" />

      <div className="flex flex-col h-full justify-between gap-8 relative z-10 color-transition">
        <div className="flex justify-between items-start w-full color-transition">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl group-hover:bg-slate-900 dark:group-hover:bg-white transition-all duration-200 color-transition">
            {IconComponent && <IconComponent className="h-9 w-9 text-slate-600 dark:text-slate-400 group-hover:text-white dark:group-hover:text-slate-900 color-transition" />}
          </div>
        </div>

        <div className="w-full color-transition">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 color-transition uppercase">
            {label}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-500 font-bold leading-snug color-transition">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
