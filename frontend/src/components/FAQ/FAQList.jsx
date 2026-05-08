import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function FAQList({ faqs, openIndex, onToggle }) {
  return (
    <div className="w-full divide-y-2 divide-slate-100 dark:divide-slate-800 color-transition">
      {faqs.length > 0 ? (
        faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="w-full color-transition">
              <button
                onClick={() => onToggle(index)}
                className="cursor-pointer w-full flex items-center justify-between p-8 text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all color-transition group"
              >
                <span className={`text-lg md:text-xl font-black tracking-tight uppercase color-transition ${isOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-xl border-2 transition-all duration-300 ${isOpen ? 'border-indigo-500 bg-indigo-500 text-white rotate-180' : 'border-slate-100 dark:border-slate-700 text-slate-400'}`}>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
              </button>
              
              {isOpen && (
                <div className="px-8 pb-10 color-transition">
                  <div className="w-full max-w-3xl color-transition">
                    <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="p-20 text-center color-transition text-slate-400 font-black uppercase tracking-widest text-xs">
          Brak wyników wyszukiwania
        </div>
      )}
    </div>
  );
}