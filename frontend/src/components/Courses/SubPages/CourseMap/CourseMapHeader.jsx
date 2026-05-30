import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ICON_MAP from "../../../../Utils/Maps/Icons";

const CourseMapHeader = ({ course }) => {
  const { t } = useTranslation();
  const AcademicCapIcon = ICON_MAP["courses"] || ICON_MAP["star"];
  const CheckIcon = ICON_MAP["check"] || ICON_MAP["sparkles"];
  const ZapIcon = ICON_MAP["zap"] || ICON_MAP["sparkles"];
  const FireIcon = ICON_MAP["fire"] || ICON_MAP["star"];

  return (
    <header className="mb-12 flex items-center justify-between">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 color-transition">
          EDUKACJA / KURSY
        </p>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter color-transition">
          {t(`courses.${course.slug}.title`)}
        </h1>
        <div className="h-1 w-20 bg-indigo-500 mb-5 mt-2 color-transition" />
        <p className="text-slate-400 font-medium color-transition">
          W tym kursie dowiesz się, jak działa polski parlament oraz jak przebiega proces legislacyjny. Poznasz też kluczowe instytucje i role w polskim systemie politycznym!
        </p>
      </div>
    </header>
  );
};

export default CourseMapHeader;
