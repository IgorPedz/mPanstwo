import ICON_MAP from "../../Utils/Maps/Icons"
import { Link } from "react-router-dom"; 
import { useTranslation } from "react-i18next";
const  ArrowLeftIcon  = ICON_MAP["left"];
export default function ReturnBtn() {
    const { t } = useTranslation()
    return (
        <div className="absolute top-6 left-6 z-20">
            <Link
                to="/auth"
                className="
                    group flex items-center gap-3 px-6 py-3 
                    bg-white dark:bg-slate-900 
                    border-2 border-slate-900 dark:border-slate-100
                    rounded-2xl color-transition cursor-pointer
                    text-[10px] font-black uppercase tracking-[0.2em]
                    text-slate-900 dark:text-white
                    hover:bg-slate-900 hover:text-white
                    dark:hover:bg-white dark:hover:text-slate-900
                    shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] 
                    dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]
                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                "
            >
                <ArrowLeftIcon className="w-4 h-4 stroke-[3] transition-transform group-hover:-translate-x-1" />
                {t("common.return")}
            </Link>
        </div>
    )
}