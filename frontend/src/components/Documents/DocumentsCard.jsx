import { DocumentTextIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function DocumentCard({ doc }) {
  return (
    <div className="group relative color-transition">

      <div className="absolute -inset-0.5 bg-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-60 transition" />

      <div className="relative rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 shadow-sm hover:shadow-md color-transition">

        <div className="p-3 w-fit rounded-xl bg-gray-100 dark:bg-white/10 text-blue-600 dark:text-blue-400 mb-4 color-transition">
          <DocumentTextIcon className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {doc.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {doc.type} • {doc.size}
        </p>

        <button className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition color-transition">
          Pobierz
          <ArrowDownTrayIcon className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}