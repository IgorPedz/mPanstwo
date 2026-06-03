import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { containerVariants, upwardItemVariants } from "../../Utils/Animations";
import { useBillDetails } from "../../Hooks/useLegislacja";

import BillDetailHeader from "../../components/Legislacja/BillDetailHeader";
import BillTitleCard    from "../../components/Legislacja/BillTitleCard";
import BillDetailTabs   from "../../components/Legislacja/BillDetailTabs";
import BillInfoTab      from "../../components/Legislacja/BillInfoTab";
import ProcessTimeline  from "../../components/Legislacja/ProcessTimeline";
import OpinionsSection  from "../../components/Legislacja/OpinionsSection";

export default function LegislacjaDetailPage() {
  const { num } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("info");

  const { data, loading, error } = useBillDetails(num);

  const sejmUrl = `https://www.sejm.gov.pl/Sejm10.nsf/druk.xsp?nr=${num}`;
  const pdfAttachments = (data?.attachments ?? []).filter((a) =>
    typeof a === "string" ? a.endsWith(".pdf") : a?.name?.endsWith(".pdf"),
  );

  return (
    <motion.div
      className="w-full min-h-screen py-8 px-4 md:px-8 color-transition"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="max-w-[1800px] mx-auto">
        <BillDetailHeader
          num={num}
          loading={loading}
          data={data}
          onNavigateBack={() => navigate("/legislation")}
        />

        {error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <ExclamationCircleIcon className="h-10 w-10 text-red-400" />
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 color-transition">
              Nie udało się załadować danych ustawy.
            </p>
          </div>
        ) : loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-32 rounded-[2rem] bg-slate-100 dark:bg-slate-800 color-transition" />
            <div className="h-64 rounded-[2rem] bg-slate-100 dark:bg-slate-800 color-transition" />
          </div>
        ) : data ? (
          <>
            <BillTitleCard
              title={data.title}
              sejmUrl={sejmUrl}
              pdfAttachments={pdfAttachments}
              num={num}
            />

            <motion.div
              variants={upwardItemVariants}
              className="bg-white dark:bg-slate-900 rounded-[2rem]
                border border-slate-200 dark:border-slate-800 shadow-sm color-transition overflow-hidden"
            >
              <BillDetailTabs active={tab} onChange={setTab} />
              <div className="p-8">
                {tab === "info"     && <BillInfoTab data={data} pdfAttachments={pdfAttachments} num={num} />}
                {tab === "process"  && <ProcessTimeline num={num} />}
                {tab === "opinions" && <OpinionsSection num={num} />}
              </div>
            </motion.div>

            <div className="mt-8">
              <button
                onClick={() => navigate("/legislation")}
                className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group
                  text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200
                  transition-colors color-transition"
              >
                <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Wróć do listy projektów
              </button>
            </div>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
