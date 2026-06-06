import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../Utils/Maps/Colors";
import { getMinistriesData } from "../../data/ministriesData";
import { useMinistryNews } from "../../Hooks/useMinistryNews";

import MinistryHero            from "../../components/Ministry/MinistryHero";
import MinistryLeadership      from "../../components/Ministry/MinistryLeadership";
import MinistryNews            from "../../components/Ministry/MinistryNews";
import MinistryResponsibilities from "../../components/Ministry/MinistryResponsibilities";
import MinistryAbout           from "../../components/Ministry/MinistryAbout";
import MinistryInfo            from "../../components/Ministry/MinistryInfo";
import FollowButton            from "../../components/Institution/FollowButton";
import { useMarkInstitutionSeen } from "../../Hooks/useMarkInstitutionSeen";

export default function MinistryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

  const ministriesData = getMinistriesData(t);
  const data   = ministriesData[slug];
  const title  = t(`dashboard.dashboardContent.${slug}.title`, { defaultValue: slug });
  const accent = state?.accent ?? data?.accent ?? "blue";
  const IconComponent  = ICON_MAP[state?.icon ?? data?.icon ?? "ministry"] ?? ICON_MAP["ministry"];
  const colorClass     = COLOR_MAP[accent] ?? "text-blue-800";
  const accentGradient = ACCENT_MAP[accent] ?? "from-blue-800 to-blue-600";

  const { news, loading: newsLoading } = useMinistryNews(slug);
  useMarkInstitutionSeen(slug, news);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center color-transition">
        <p className="text-slate-400 dark:text-slate-500">Nie znaleziono informacji o tej instytucji.</p>
      </div>
    );
  }

  const institutionType = data.type ?? t("staticData.ministries.ministry");

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
            className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            {t("institution.back")}
          </button>
          <FollowButton
            institution={{ id: slug, title, titleKey: `dashboard.dashboardContent.${slug}.title`, icon: state?.icon ?? data?.icon ?? "ministry", accent, path: `/ministry/${slug}` }}
            colorClass={colorClass}
          />
        </motion.div>

        <MinistryHero
          title={title}
          institutionType={institutionType}
          IconComponent={IconComponent}
          colorClass={colorClass}
          accentGradient={accentGradient}
          website={data.website}
        />

        <MinistryLeadership
          people={data.leadership ?? []}
          leadershipLabel={data.leadershipLabel ?? "Kierownictwo"}
          leaderLabel={data.leaderLabel ?? "Minister"}
          colorClass={colorClass}
          accentGradient={accentGradient}
        />

        <MinistryNews
          news={news}
          loading={newsLoading}
          website={data.website}
          title={title}
          IconComponent={IconComponent}
          colorClass={colorClass}
          accentGradient={accentGradient}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <MinistryResponsibilities
            responsibilities={data.responsibilities}
            colorClass={colorClass}
          />
          <div className="flex flex-col gap-5">
            <MinistryAbout description={data.description} institutionType={institutionType} />
            <MinistryInfo
              title={title}
              institutionType={institutionType}
              website={data.website}
              subordinateTo={data.subordinateTo}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
