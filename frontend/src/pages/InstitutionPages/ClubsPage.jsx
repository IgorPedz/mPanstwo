import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { pageVariants, sectionVariants } from "../../Utils/Animations";
import { useSejmClubs } from "../../Hooks/useSejm";

import clubsData from "../../data/clubsData";

import ClubCard from "../../components/Sejm/ClubCard";
import ClubsHero from "../../components/Sejm/ClubHero";
import ClubsSkeleton from "../../components/Sejm/ClubSkeleton";
import ClubsFooter from "../../components/Sejm/ClubFooter";

const INDEPENDENT_CLUB_ID = "niez.";

export default function ClubsPage() {
  const navigate = useNavigate();
  const { data: clubs, loading } = useSejmClubs();

  const sortedClubs = useMemo(
    () =>
      [...clubs].sort((a, b) => {
      if (a.id === INDEPENDENT_CLUB_ID) return 1;
      if (b.id === INDEPENDENT_CLUB_ID) return -1;
      return b.membersCount - a.membersCount;
      }),
    [clubs],
  );

  const totalMPs = useMemo(
    () => clubs.reduce((sum, club) => sum + club.membersCount, 0),
    [clubs]
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen w-full px-4 md:px-8 py-10 md:py-14"
    >
      <div className="space-y-5">
        <motion.div variants={sectionVariants}>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold group text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Wróć
          </button>
        </motion.div>

        <ClubsHero count={clubs.length} />

        {loading ? (
          <ClubsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sortedClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                staticData={clubsData[club.id]}
              />
            ))}
          </div>
        )}

        <ClubsFooter totalMPs={totalMPs} />
      </div>
    </motion.div>
  );
}
