import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

import { useJudicialNews } from "../../Hooks/useJudicialNews";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../Utils/Maps/Colors";
import { getJudicialData } from "../../data/judicialData";

import JudicialHero from "../../components/Judicial/JudicialHero";
import JudicialLeadership from "../../components/Judicial/JudicialLeadership";
import JudicialNews from "../../components/Judicial/JudicialNews";
import JudicialResponsibilities from "../../components/Judicial/JudicialResponsibilities";
import JudicialAbout from "../../components/Judicial/JudicialAbout";
import JudicialInfo from "../../components/Judicial/JudicialInfo";
import FollowButton from "../../components/Institution/FollowButton";
import { useMarkInstitutionSeen } from "../../Hooks/useMarkInstitutionSeen";

export default function JudicialPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const allData = getJudicialData(t);
  const data = allData[slug];
  const { data: news, loading: newsLoading } = useJudicialNews(slug);
  useMarkInstitutionSeen(slug, news);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400 dark:text-slate-500">
          {t("institution.notFound")}
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
        <motion.div variants={sectionVariants} className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold group cursor-pointer
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            {t("institution.back")}
          </button>
          <FollowButton
            institution={{ id: slug, title: data.type, titleKey: `staticData.judicial.${slug}.type`, icon: data.icon, accent: data.accent, path: `/courts/${slug}` }}
            colorClass={colorClass}
          />
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
