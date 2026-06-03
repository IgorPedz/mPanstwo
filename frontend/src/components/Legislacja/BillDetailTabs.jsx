import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const TABS = [
  { key: "info",     label: "Informacje",       icon: DocumentTextIcon },
  { key: "process",  label: "Etapy legislacji",  icon: ClockIcon },
  { key: "opinions", label: "Opinie",            icon: ChatBubbleLeftEllipsisIcon },
];

export default function BillDetailTabs({ active, onChange }) {
  return (
    <div className="p-2 border-b border-slate-100 dark:border-slate-800 color-transition">
      <div className="flex gap-1 p-1 bg-slate-50 dark:bg-slate-800/60 rounded-[1.3rem] w-fit color-transition">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-[1.1rem]
                text-[10px] font-black uppercase tracking-widest
                color-transition cursor-pointer outline-none transition-colors
                ${isActive ? "text-white dark:text-slate-900" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="detailTabIndicator"
                  className="absolute inset-0 bg-slate-900 dark:bg-white rounded-[1.1rem] z-0 shadow-sm color-transition"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <Icon className="h-3.5 w-3.5 relative z-10" />
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
