import { useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ScaleIcon,
  HandRaisedIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import {
  useMPDetails,
  useMPVotings,
  useMPCommittees,
  useMPInterpellations,
  useMPWrittenQuestions,
} from "../../Hooks/useSejm";

import MPHero from "../../components/Sejm/MPHero";
import MPSection from "../../components/Sejm/MPSection";
import MPActivityCard from "../../components/Sejm/MPActivityCard";
import MPCommittees from "../../components/Sejm/MPCommittees";
import MPDocList from "../../components/Sejm/MPDocList";
import MPVotingHistory from "../../components/Sejm/MPVotingHistory";

export default function MpProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const votingRef = useRef(null);
  const committeeRef = useRef(null);
  const interpRef = useRef(null);
  const questionsRef = useRef(null);

  const { data: mp, loading: mpLoading } = useMPDetails(id);
  const { data: votings, loading: votingsLoading } = useMPVotings(id);
  const { data: committees, loading: committeesLoading } = useMPCommittees(id);
  const { data: interps, loading: interpsLoading } = useMPInterpellations(id);
  const { data: questions, loading: questionsLoading } =
    useMPWrittenQuestions(id);

  const padId = String(id ?? "").padStart(6, "0");
  const padId3 = String(id ?? "").padStart(3, "0");
  const sejmUrl = id
    ? `https://www.sejm.gov.pl/sejm10.nsf/posel.xsp?id=${padId}`
    : null;
  const speechUrl = id
    ? `https://www.sejm.gov.pl/sejm10.nsf/wypowiedzi.xsp?id=${padId3}&type=P&symbol=WYPOWIEDZI_POSLA`
    : null;

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const votesTotal = votings?.length ?? 0;

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
            onClick={() => navigate("/sejm/poslowie")}
            className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group
              text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Posłowie
          </button>
        </motion.div>

        <MPHero
          id={id}
          mp={mp}
          mpLoading={mpLoading}
          sejmUrl={sejmUrl}
          speechUrl={speechUrl}
        />

        <MPSection label="Aktywność poselska">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <MPActivityCard
              icon={ChatBubbleLeftRightIcon}
              label="Wystąpienia na posiedzeniach"
              href={speechUrl}
              accent="indigo"
            />
            <MPActivityCard
              icon={DocumentTextIcon}
              label="Interpelacje"
              onClick={() => scrollTo(interpRef)}
              accent="sky"
              count={interpsLoading ? null : interps.length || null}
            />
            <MPActivityCard
              icon={ScaleIcon}
              label="Zapytania pisemne"
              onClick={() => scrollTo(questionsRef)}
              accent="purple"
              count={questionsLoading ? null : questions.length || null}
            />
            <MPActivityCard
              icon={HandRaisedIcon}
              label="Głosowania"
              onClick={() => scrollTo(votingRef)}
              accent="emerald"
              count={votingsLoading ? null : votesTotal || null}
            />
            <MPActivityCard
              icon={BuildingLibraryIcon}
              label="Komisje i podkomisje"
              onClick={() => scrollTo(committeeRef)}
              accent="amber"
              count={committeesLoading ? null : committees.length || null}
            />
          </div>
        </MPSection>

        <MPSection refProp={committeeRef} label="Komisje i podkomisje">
          <MPCommittees committees={committees} loading={committeesLoading} />
        </MPSection>

        <MPSection
          refProp={interpRef}
          label={`Interpelacje${interps.length ? ` — ${interps.length}` : ""}`}
        >
          <MPDocList
            items={interps}
            loading={interpsLoading}
            emptyText="Brak złożonych interpelacji."
          />
        </MPSection>

        <MPSection
          refProp={questionsRef}
          label={`Zapytania pisemne${questions.length ? ` — ${questions.length}` : ""}`}
        >
          <MPDocList
            items={questions}
            loading={questionsLoading}
            emptyText="Brak złożonych zapytań pisemnych."
          />
        </MPSection>

        <MPVotingHistory
          refProp={votingRef}
          votings={votings}
          loading={votingsLoading}
        />
      </div>
    </motion.div>
  );
}
