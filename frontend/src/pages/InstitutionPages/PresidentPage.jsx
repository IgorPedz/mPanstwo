import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import ICON_MAP from "../../Utils/Maps/Icons";
import { ACCENT_MAP } from "../../Utils/Maps/Accents";
import { COLOR_MAP } from "../../Utils/Maps/Colors";
import presidentData from "../../data/presidentData";
import { useMinistryNews } from "../../Hooks/useMinistryNews";

import MinistryHero             from "../../components/Ministry/MinistryHero";
import MinistryLeadership       from "../../components/Ministry/MinistryLeadership";
import MinistryNews             from "../../components/Ministry/MinistryNews";
import MinistryResponsibilities from "../../components/Ministry/MinistryResponsibilities";
import MinistryAbout            from "../../components/Ministry/MinistryAbout";
import PresidentInfo            from "../../components/President/PresidentInfo";

export default function PresidentPage() {
  const navigate = useNavigate();

  const data           = presidentData;
  const IconComponent  = ICON_MAP[data.icon] ?? ICON_MAP["flag"];
  const colorClass     = COLOR_MAP[data.accent] ?? "text-red-700";
  const accentGradient = ACCENT_MAP[data.accent] ?? "from-red-700 to-red-500";

  const { news, loading: newsLoading } = useMinistryNews("president");

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
            Wróć
          </button>
        </motion.div>

        <MinistryHero
          title="Prezydent Rzeczypospolitej Polskiej"
          institutionType={data.type}
          IconComponent={IconComponent}
          colorClass={colorClass}
          accentGradient={accentGradient}
          website={data.website}
        />

        <MinistryLeadership
          people={data.leadership ?? []}
          leadershipLabel={data.leadershipLabel ?? "Prezydent"}
          leaderLabel={data.leaderLabel ?? "Prezydent"}
          colorClass={colorClass}
          accentGradient={accentGradient}
        />

        <MinistryNews
          news={news}
          loading={newsLoading}
          website={data.website}
          title="Prezydent RP"
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
            <MinistryAbout
              description={data.description}
              label="O urzędzie"
            />
            <PresidentInfo
              infoFields={data.infoFields}
              website={data.website}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
