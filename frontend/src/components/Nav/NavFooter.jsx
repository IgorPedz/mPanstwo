import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";
import Settings from "../Global/Settings";
import LogOut from "../Global/LogOut";

export default function NavFooter() {
  const { user } = useUser();
  const navigate  = useNavigate();
  const location  = useLocation();

  const { t } = useTranslation();
  const isAdmin     = user?.role === "Administrator";
  const isModerator = user?.role === "Moderator";
  const isExpert    = user?.role === "Ekspert";

  return (
    <div className="
      mt-auto
      border-t-2 border-slate-100 dark:border-slate-900
      bg-slate-50 dark:bg-slate-950
      color-transition
    ">

      {(isAdmin || isModerator || isExpert) && (
        <div className="px-3 pt-3 flex flex-col gap-1.5">
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer
                ${location.pathname === "/admin"
                  ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                  : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50"
                } color-transition`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              {t("nav.panels.admin")}
            </button>
          )}
          {isModerator && (
            <button
              onClick={() => navigate("/moderator")}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer
                ${location.pathname === "/moderator"
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                  : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/50"
                } color-transition`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18M3 6l9-3 9 3-9 3-9-3z" />
              </svg>
              {t("nav.panels.moderator")}
            </button>
          )}
          {isExpert && (
            <button
              onClick={() => navigate("/expert")}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                text-[10px] font-black uppercase tracking-widest transition-all
                ${location.pathname === "/expert"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-950/50"
                } color-transition`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t("nav.panels.expert")}
            </button>
          )}
        </div>
      )}

      <div className="p-3 space-y-2">
        <div className="color-transition
          border border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900 cursor-pointer
        ">
          <Settings />
        </div>

        <div className="color-transition
          border border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900
          hover:bg-red-50 dark:hover:bg-red-950/20
          transition-colors cursor-pointer
        ">
          <LogOut />
        </div>
      </div>
    </div>
  );
}