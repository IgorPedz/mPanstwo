import Settings from "../Global/Settings";
import LogOut from "../Global/LogOut";

export default function NavFooter() {
  return (
    <div className="
      mt-auto
      border-t-2 border-slate-100 dark:border-slate-900
      bg-slate-50 dark:bg-slate-950
      color-transition
    ">

      <div className="
        p-3 space-y-2
      ">

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