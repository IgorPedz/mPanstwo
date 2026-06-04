import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../Utils/Maps/Colors";
import { getSenatData } from "../../data/senatData";
import { useSenatLeadership, useSenatClubs, useSenatProceedings } from "../../Hooks/useSenat";

import SenatHero              from "../../components/Senat/SenatHero";
import SenatLeadership        from "../../components/Senat/SenatLeadership";
import SenatHemicycleSection  from "../../components/Senat/SenatHemicycleSection";
import SenatProceedings       from "../../components/Senat/SenatProceedings";
import MinistryResponsibilities from "../../components/Ministry/MinistryResponsibilities";
import MinistryAbout          from "../../components/Ministry/MinistryAbout";
import SenatInfo              from "../../components/Senat/SenatInfo";

export default function SenatPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const data           = getSenatData(t);
  const IconComponent  = ICON_MAP[data.icon] ?? ICON_MAP["parliament"];
  const colorClass     = COLOR_MAP[data.accent] ?? "text-red-700";
  const accentGradient = ACCENT_MAP[data.accent] ?? "from-red-700 to-red-500";

  const { data: leadership, loading: leaderLoading } = useSenatLeadership();
  const { data: clubs,      loading: clubsLoading  } = useSenatClubs();
  const { data: proceedings, loading: procLoading  } = useSenatProceedings();

  const totalMembers = clubs.reduce((s, c) => s + (c.membersCount ?? 0), 0) || 100;

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
            className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            {t("institution.back")}
          </button>
        </motion.div>

        <SenatHero data={data} IconComponent={IconComponent} colorClass={colorClass} accentGradient={accentGradient} />

        <SenatLeadership
          leadership={leadership}
          loading={leaderLoading}
          leadershipLabel={data.leadershipLabel}
          colorClass={colorClass}
          accentGradient={accentGradient}
        />

        <SenatHemicycleSection clubs={clubs} loading={clubsLoading} totalMembers={totalMembers} />

        <SenatProceedings
          proceedings={proceedings}
          loading={procLoading}
          IconComponent={IconComponent}
          colorClass={colorClass}
          accentGradient={accentGradient}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <MinistryResponsibilities responsibilities={data.responsibilities} colorClass={colorClass} />
          <div className="flex flex-col gap-5">
            <MinistryAbout description={data.description} label={t("institution.senat.about")} />
            <SenatInfo infoFields={data.infoFields} website={data.website} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
