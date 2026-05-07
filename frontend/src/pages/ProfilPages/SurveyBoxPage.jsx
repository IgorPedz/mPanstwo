import { motion } from "framer-motion";
import SurveyCard from "../../components/Surveys/SurveyCard";
import SurveyHeader from "../../components/Surveys/SurveyHeader";
import { containerVariants } from "../../Utils/Animations";

export default function SurveyBoxPage() {
  const surveys = [
    { id: 1, title: "Reformy Podatkowe 2026", time: "5 min", reward: "150 XP", category: "Ekonomia", status: "Nowa" },
    { id: 2, title: "Oczekiwania wobec Ministra Cyfryzacji", time: "3 min", reward: "100 XP", category: "Technologia", status: "Nowa" },
    { id: 3, title: "Lokalny Plan Zagospodarowania", time: "8 min", reward: "250 XP", category: "Region", status: "Gorąca" },
  ];

  return (
    <motion.div 
      className="w-full min-h-screen p-8 color-transition"
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
    >
      <div className="max-w-[1800px] mx-auto space-y-8">
        <SurveyHeader totalRewards="1200" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}