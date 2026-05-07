import { DocumentArrowDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function DocumentsCard({ doc }) {
  return (
    <div className="group relative w-full p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] transition-all duration-200 hover:border-slate-900 dark:hover:border-slate-100 overflow-hidden color-transition">
      
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none color-transition z-20" />

      <div className="flex flex-col h-full justify-between gap-8 relative z-10 color-transition">
        <div className="flex justify-between items-start w-full color-transition">

          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl group-hover:bg-slate-900 dark:group-hover:bg-white transition-all duration-200 color-transition">
            <DocumentTextIcon className="h-9 w-9 text-slate-600 dark:text-slate-400 group-hover:text-white dark:group-hover:text-slate-900 color-transition" />
          </div>
          
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 color-transition">
            {doc.size || "1.4 MB"}
          </span>
        </div>

        <div className="w-full color-transition">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 color-transition uppercase">
            {doc.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-500 font-bold leading-snug color-transition">
            {doc.description}
          </p>
        </div>

        <button className="w-full py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white transition-all cursor-pointer color-transition shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
          <DocumentArrowDownIcon className="h-5 w-5 color-transition" />
          POBIERZ PLIK
        </button>
      </div>
    </div>
  );
}