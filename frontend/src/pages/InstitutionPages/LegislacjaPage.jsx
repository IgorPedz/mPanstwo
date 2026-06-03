import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DocumentTextIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { containerVariants } from "../../Utils/Animations";
import { useBills } from "../../Hooks/useLegislacja";

import LegislacjaHeader  from "../../components/Legislacja/LegislacjaHeader";
import BillFilters       from "../../components/Legislacja/BillFilters";
import BillCard          from "../../components/Legislacja/BillCard";
import BillSkeletonCard  from "../../components/Legislacja/BillSkeletonCard";
import BillPagination    from "../../components/Legislacja/BillPagination";

const LIMIT = 15;

export default function LegislacjaPage() {
  const navigate = useNavigate();

  const [search,  setSearch]  = useState("");
  const [type,    setType]    = useState("all");
  const [page,    setPage]    = useState(0);
  const [dSearch, setDSearch] = useState("");
  const searchTimer = useRef(null);

  function handleSearch(val) {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => { setDSearch(val); setPage(0); }, 400);
  }

  function handleTypeChange(val) {
    setType(val);
    setPage(0);
  }

  const { items, total, loading, error } = useBills({ page, limit: LIMIT, search: dSearch, type });
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <motion.div
      className="w-full min-h-screen py-8 px-4 md:px-8 color-transition"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="max-w-[1800px] mx-auto">
        <LegislacjaHeader total={total} loading={loading} />

        <BillFilters
          type={type}
          onTypeChange={handleTypeChange}
          search={search}
          onSearchChange={handleSearch}
        />

        {error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <ExclamationCircleIcon className="h-10 w-10 text-red-400" />
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 color-transition">
              Błąd ładowania danych. Spróbuj odświeżyć stronę.
            </p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(LIMIT)].map((_, i) => <BillSkeletonCard key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <DocumentTextIcon className="h-12 w-12 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 color-transition">
              Nie znaleziono projektów ustaw.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {items.map((bill) => (
                  <BillCard
                    key={bill.number}
                    bill={bill}
                    onNavigate={(num) => navigate(`/legislation/${num}`)}
                  />
                ))}
              </AnimatePresence>
            </div>

            <BillPagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
}
