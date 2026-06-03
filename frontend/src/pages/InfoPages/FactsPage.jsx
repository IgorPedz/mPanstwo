import { motion } from "framer-motion";
import {
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { pageVariants } from "../../Utils/Animations";
import { SOURCES, RELIABILITY } from "../../Utils/Maps/Content.jsx";
import FactsHeader from "../../components/Facts/FactsHeader";
import FactsSources from "../../components/Facts/FactsSources";
import FactsReliability from "../../components/Facts/FactsReliability";
import FactsFooter from "../../components/Facts/FactsFooter";
export default function FactsPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="w-full min-h-screen flex flex-col items-center px-7 py-8 color-transition"
    >
      <div className="w-full max-w-[1800px] space-y-16 color-transition">
        <FactsHeader />

        <FactsSources />

        <FactsReliability />

        <FactsFooter />
      </div>
    </motion.div>
  );
}
