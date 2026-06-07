import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import { useAllMPs, prefetchMPDetails } from "../../Hooks/useSejm";

import MPListHero    from "../../components/Sejm/MPListHero";
import MPFilters     from "../../components/Sejm/MPFilters";
import MPCard        from "../../components/Sejm/MPCard";
import MPSkeletonCard from "../../components/Sejm/MPSkeletonCard";
import MPPagination  from "../../components/Sejm/MPPagination";

const PER_PAGE = 48;

const CLUB_ORDER = [
  "KO", "PSL-TD", "Polska2050", "Lewica", "Razem",
  "PiS", "Konfederacja", "Konfederacja_KP", "Centrum", "Demokracja", "niez.",
];

export default function MpListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: allMPs, loading } = useAllMPs();

  const [search,   setSearch]   = useState("");
  const [club,     setClub]     = useState("all");
  const [district, setDistrict] = useState("all");
  const [page,     setPage]     = useState(0);

  useEffect(() => { setPage(0); }, [search, club, district]);

  const clubs = useMemo(() => {
    const set = new Set(allMPs.map((m) => m.club).filter(Boolean));
    return CLUB_ORDER.filter((c) => set.has(c));
  }, [allMPs]);

  const districts = useMemo(() => {
    const map = {};
    allMPs.forEach((m) => { if (m.districtName) map[m.districtNum] = m.districtName; });
    return Object.entries(map)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([num, name]) => ({ num: Number(num), name }));
  }, [allMPs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allMPs.filter((m) => {
      if (club !== "all" && m.club !== club) return false;
      if (district !== "all" && String(m.districtNum) !== district) return false;
      if (q && !m.firstLastName?.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [allMPs, search, club, district]);

  const pageSlice = useMemo(
    () => filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE),
    [filtered, page],
  );

  function handlePageChange(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    setClub("all");
    setDistrict("all");
    setSearch("");
  }

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
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            {t("institution.back")}
          </button>
        </motion.div>

        <MPListHero
          filteredCount={filtered.length}
          totalCount={allMPs.length}
          loading={loading}
        />

        <MPFilters
          clubs={clubs}
          districts={districts}
          club={club}
          district={district}
          search={search}
          onClub={setClub}
          onDistrict={setDistrict}
          onSearch={setSearch}
          onReset={handleReset}
          hasActiveFilters={club !== "all" || district !== "all" || !!search}
        />

        <motion.div variants={sectionVariants}>
          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {Array.from({ length: PER_PAGE }).map((_, i) => <MPSkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-24">
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium color-transition">
                {t("institution.mpList.noResults")}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {pageSlice.map((mp, i) => (
                  <MPCard
                    key={mp.id}
                    mp={mp}
                    priority={i < 16}
                    onClick={() => navigate(`/sejm/mp/${mp.id}`)}
                    onHover={() => prefetchMPDetails(mp.id)}
                  />
                ))}
              </div>
              <MPPagination
                page={page}
                total={filtered.length}
                perPage={PER_PAGE}
                onChange={handlePageChange}
              />
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
