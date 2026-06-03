import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function JudicialNewsCard({
  item,
  IconComponent,
  accentGradient,
  institutionName,
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex flex-col rounded-2xl overflow-hidden
        border border-slate-200/70 dark:border-slate-700/50
        bg-slate-50 dark:bg-slate-800/40
        hover:border-slate-300 dark:hover:border-slate-600
        hover:shadow-md transition-all
      "
    >
      <div className="w-full aspect-video overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className={`
              w-full h-full flex flex-col items-center justify-center gap-2
              bg-gradient-to-br ${accentGradient}
            `}
          >
            <IconComponent className="h-10 w-10 text-white/60" />

            <span
              className="
                px-4 text-center
                text-[10px] font-black uppercase tracking-widest
                text-white/50 line-clamp-2
              "
            >
              {institutionName}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <p
          className="
            text-xs font-black leading-snug line-clamp-2
            text-slate-900 dark:text-white
            group-hover:text-slate-700
            dark:group-hover:text-slate-100
          "
        >
          {item.title}
        </p>

        {item.lead && (
          <p
            className="
              text-[11px] leading-relaxed line-clamp-2
              text-slate-500 dark:text-slate-400
            "
          >
            {item.lead}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
            {item.date}
          </span>

          <ArrowTopRightOnSquareIcon
            className="
              h-3.5 w-3.5
              text-slate-300 dark:text-slate-600
              group-hover:text-slate-500
              dark:group-hover:text-slate-400
            "
          />
        </div>
      </div>
    </a>
  );
}
