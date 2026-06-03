import {
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const LINKS = (t) => [
  { href: "/contact",   icon: EnvelopeIcon,             label: t("contact.contact") },
  { href: "/faq",       icon: QuestionMarkCircleIcon,    label: t("faq.faq") },
  { href: "/documents", icon: DocumentTextIcon,          label: t("documents.documents") },
  { href: "/facts",     icon: InformationCircleIcon,     label: t("facts.facts") },
];

const LoginFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-12 w-full max-w-2xl border-t-2 border-slate-900/10 dark:border-white/10 pt-6">
      <div className="flex justify-center gap-x-8">
        {LINKS(t).map(({ href, icon: Icon, label }) => (
          <a key={href} href={href} className="group flex items-center gap-2">
            <Icon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {label}
            </span>
          </a>
        ))}
      </div>

      <p className="text-center mt-8 text-[9px] font-medium text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
        {t("auth.loginFooter")}
      </p>
    </div>
  );
};

export default LoginFooter;
