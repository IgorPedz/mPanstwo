import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../Utils/Maps/Colors";
import { getSejmData } from "../../data/sejmData";
import { useSejmLeadership, useSejmClubs, useSejmProceedings } from "../../Hooks/useSejm";

import SejmHero          from "../../components/Sejm/SejmHero";
import SejmLeadership    from "../../components/Sejm/SejmLeadership";
import SejmHemicycle     from "../../components/Sejm/SejmHemicycle";
import SejmProceedings   from "../../components/Sejm/SejmProceedings";
import MinistryResponsibilities from "../../components/Ministry/MinistryResponsibilities";
import MinistryAbout     from "../../components/Ministry/MinistryAbout";
import SejmInfo          from "../../components/Sejm/SejmInfo";

export default function SejmPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const data           = getSejmData(t);
  const IconComponent  = ICON_MAP[data.icon] ?? ICON_MAP["parliament"];
  const colorClass     = COLOR_MAP[data.accent] ?? "text-indigo-800";
  const accentGradient = ACCENT_MAP[data.accent] ?? "from-indigo-800 to-indigo-600";

  const { data: leadership, loading: leaderLoading } = useSejmLeadership();
  const { data: clubs,      loading: clubsLoading  } = useSejmClubs();
  const { data: proceedings, loading: procLoading  } = useSejmProceedings();

  const totalMembers = clubs.reduce((s, c) => s + (c.membersCount ?? 0), 0) || 460;

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

        <SejmHero data={data} IconComponent={IconComponent} colorClass={colorClass} accentGradient={accentGradient} />

        <SejmLeadership
          leadership={leadership}
          loading={leaderLoading}
          leadershipLabel={data.leadershipLabel}
          colorClass={colorClass}
          accentGradient={accentGradient}
        />

        <SejmHemicycle clubs={clubs} loading={clubsLoading} totalMembers={totalMembers} />

        <SejmProceedings
          proceedings={proceedings}
          loading={procLoading}
          IconComponent={IconComponent}
          colorClass={colorClass}
          accentGradient={accentGradient}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <MinistryResponsibilities responsibilities={data.responsibilities} colorClass={colorClass} />
          <div className="flex flex-col gap-5">
            <MinistryAbout description={data.description} label={t("institution.sejm.about")} />
            <SejmInfo infoFields={data.infoFields} website={data.website} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
