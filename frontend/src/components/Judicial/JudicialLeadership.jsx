import { motion } from "framer-motion";
import { UserIcon } from "@heroicons/react/24/outline";
import { sectionVariants } from "../../Utils/Animations";
import LeadershipCard from "./JudicialLeadershipCard";
export default function JudicialLeadership({ data, people, colorClass }) {
  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-900 p-6 md:p-8"
    >
      <p className="section-label">{data.leadershipLabel}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {people.map((person) => {
          const isLeader = person.role === data.leaderRole;

          const isVacancy = person.name === "WAKAT";

          return (
            <LeadershipCard
              key={`${person.role}-${person.name}`}
              person={person}
              isLeader={isLeader}
              isVacancy={isVacancy}
              colorClass={colorClass}
              leaderLabel={data.leaderLabel}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
