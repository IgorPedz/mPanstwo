import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { containerVariants, upwardItemVariants } from "../../Utils/Animations";
import { useBillDetails } from "../../Hooks/useLegislacja";
import { useTranslation } from "react-i18next";

import BillDetailHeader from "../../components/Legislacja/BillDetailHeader";
import BillTitleCard    from "../../components/Legislacja/BillTitleCard";
import BillDetailTabs   from "../../components/Legislacja/BillDetailTabs";
import BillInfoTab      from "../../components/Legislacja/BillInfoTab";
import ProcessTimeline  from "../../components/Legislacja/ProcessTimeline";
import OpinionsSection  from "../../components/Legislacja/OpinionsSection";

export default function LegislacjaDetailPage() {
  const { num } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(() => {
    const t = searchParams.get("tab");
    return ["info", "process", "votings", "opinions"].includes(t) ? t : "info";
  });

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
              {t("institution.legislation.billLoadError")}
            </p>
          </div>
        ) : loading ? (
          <div className="animate-pulse space-y-5">
            {/* TitleCard skeleton */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 color-transition">
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-4 w-5/6 rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-4 w-3/4 rounded-full bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="flex gap-3">
                <div className="h-9 w-52 rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-9 w-36 rounded-2xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>

            {/* Tabs + content skeleton */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 color-transition overflow-hidden">
              {/* Tab bar */}
              <div className="flex gap-1 px-6 pt-5 pb-0 border-b border-slate-100 dark:border-slate-800">
                <div className="h-9 w-24 rounded-t-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-9 w-28 rounded-t-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-9 w-24 rounded-t-xl bg-slate-100 dark:bg-slate-800" />
              </div>
              {/* Content */}
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="h-3 w-24 rounded-full bg-slate-100 dark:bg-slate-800" />
                      <div className="h-5 w-40 rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="h-4 w-4/5 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="h-4 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
            </div>
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
                {t("institution.legislation.backToList")}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
