export default function ContactCard({ Icon, title, value, color }) {
  return (
    <div className="flex-1">
      <div
        className="group flex flex-col items-center gap-4 p-8
        bg-white/70 dark:bg-gray-900/60 backdrop-blur
        border border-gray-200/70 dark:border-gray-800
        rounded-2xl transition-all duration-300
        hover:shadow-xl hover:-translate-y-2
        hover:border-transparent"
      >
        <div className="color-transition p-3 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition">
          {Icon && <Icon className={`w-7 h-7 ${color}`} />}
        </div>

        <div className="text-center">
          <div className="color-transition font-semibold text-lg dark:text-white">{title}</div>
          <div className="color-transition text-gray-500 dark:text-gray-400 text-sm mt-1">{value}</div>
        </div>
      </div>
    </div>
  );
}