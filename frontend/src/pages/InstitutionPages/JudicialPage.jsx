import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { useJudicialNews } from "../../Hooks/useJudicialNews";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../Utils/Maps/Colors";
import judicialData from "../../data/judicialData";

import JudicialHero from "../../components/Judicial/JudicialHero";
import JudicialLeadership from "../../components/Judicial/JudicialLeadership";
import JudicialNews from "../../components/Judicial/JudicialNews";
import JudicialResponsibilities from "../../components/Judicial/JudicialResponsibilities";
import JudicialAbout from "../../components/Judicial/JudicialAbout";
import JudicialInfo from "../../components/Judicial/JudicialInfo";

export default function JudicialPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const data = judicialData[slug];
  const { data: news, loading: newsLoading } = useJudicialNews(slug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400 dark:text-slate-500">
          Nie znaleziono informacji o tej instytucji.
        </p>
      </div>
    );
  }

  const IconComponent = ICON_MAP[data.icon] ?? ICON_MAP.scale;
  const colorClass = COLOR_MAP[data.accent] ?? "text-indigo-800";
  const accentGradient =
    ACCENT_MAP[data.accent] ?? "from-indigo-800 to-indigo-600";

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen w-full px-4 md:px-8 py-10 md:py-14 color-transition"
    >
      <div className="w-full space-y-5">
        <motion.div variants={sectionVariants}>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold group cursor-pointer
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Wróć
          </button>
        </motion.div>

        <JudicialHero
          data={data}
          IconComponent={IconComponent}
          colorClass={colorClass}
          accentGradient={accentGradient}
        />

        <JudicialLeadership
          data={data}
          people={data.leadership ?? []}
          colorClass={colorClass}
        />

        <JudicialNews
          news={news}
          loading={newsLoading}
          website={data.website}
          colorClass={colorClass}
          accentGradient={accentGradient}
          IconComponent={IconComponent}
          institutionName={data.type}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <JudicialResponsibilities
            responsibilities={data.responsibilities}
            colorClass={colorClass}
          />

          <div className="flex flex-col gap-5">
            <JudicialAbout description={data.description} />
            <JudicialInfo infoFields={data.infoFields} website={data.website} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
