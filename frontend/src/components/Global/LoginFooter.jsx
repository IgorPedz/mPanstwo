import { EnvelopeIcon, QuestionMarkCircleIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const LoginFooter = () => {
  const { t } = useTranslation();
  
  return (
    <div className="mt-12 w-full max-w-md border-t-2 border-slate-900/10 dark:border-white/10 pt-6">
      <div className="flex justify-between items-center px-2">
        
        <a href="/contact" className="group flex items-center gap-2">
          <EnvelopeIcon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <span className="text-[15px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {t("contact.contact")}
          </span>
        </a>


        <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />

        <a href="/faq" className="group flex items-center gap-2">
          <QuestionMarkCircleIcon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <span className="text-[15px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {t("faq.faq")}
          </span>
        </a>

        <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />

        <a href="/documents" className="group flex items-center gap-2">
          <DocumentTextIcon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <span className="text-[15px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {t("documents.documents")}
          </span>
        </a>

      </div>
      
      <p className="text-center mt-8 text-[9px] font-medium text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
        {t("auth.loginFooter")}
      </p>
    </div>
  );
};


export default LoginFooter;