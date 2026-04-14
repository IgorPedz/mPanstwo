import { EnvelopeIcon, QuestionMarkCircleIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const LoginFooter = () => {
  return (
    <div className="mt-6 mb-6 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex justify-center">
        
        <a
          href="/contact"
          className="flex items-center gap-2 px-4 py-3 
            text-gray-700 dark:text-gray-200
            bg-transparent 
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all duration-200 color-transition"
        >
          <EnvelopeIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Kontakt</span>
        </a>

        <a
          href="/help"
          className="flex items-center gap-2 px-4 py-3 
            text-gray-700 dark:text-gray-200
            bg-transparent 
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all duration-200 color-transition"
        >
          <QuestionMarkCircleIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Pomoc</span>
        </a>

        <a
          href="/documents"
          className="flex items-center gap-2 px-4 py-3 
            text-gray-700 dark:text-gray-200
            bg-transparent 
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all duration-200 color-transition"
        >
          <DocumentTextIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Dokumenty</span>
        </a>

      </div>
    </div>
  );
};

export default LoginFooter;