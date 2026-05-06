export default function ContactInfoCard({ info }) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-gray-200/70 dark:border-white/10 shadow-sm hover:shadow-md backdrop-blur-sm bg-white/40 dark:bg-white/5 color-transition">

      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {info.label}
      </p>

      <p className="text-base sm:text-lg font-medium mt-2 text-gray-900 dark:text-white">
        {info.value}
      </p>

    </div>
  );
}