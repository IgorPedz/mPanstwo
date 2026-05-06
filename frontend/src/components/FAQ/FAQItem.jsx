import { ChevronDownIcon, TagIcon } from "@heroicons/react/24/outline";

export default function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="
        w-full rounded-2xl
        border border-gray-200 dark:border-gray-800
        cursor-pointer
        transition-all duration-300
        hover:border-gray-300 dark:hover:border-gray-700
      "
    >
      <div className="flex items-center justify-between gap-4 p-6">
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {faq.question}
        </span>
        <div className="flex items-center gap-4">
          <span className=" color-transition
            flex items-center gap-2 px-4 py-2 text-sm rounded-xl
            border border-gray-200 dark:border-gray-800
            text-gray-600 dark:text-gray-300
          ">
            <TagIcon className="w-4 h-4" />
            {faq.category}
          </span>
          <ChevronDownIcon
            className={`
              w-6 h-6 transition-transform duration-300 shrink-0
              ${isOpen ? "rotate-180 text-blue-500" : "text-gray-400"}
            `}
          />
        </div>
      </div>
      <div className={`
        px-6 overflow-hidden transition-all duration-300
        ${isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}
      `}>
        <p className="text-gray-600 dark:text-gray-400">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}