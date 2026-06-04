import { motion } from "framer-motion";
import {
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import { SOURCES, RELIABILITY } from "../../Utils/Maps/Content.jsx";
import FactsHeader from "../../components/Facts/FactsHeader";
import FactsSources from "../../components/Facts/FactsSources";
import FactsReliability from "../../components/Facts/FactsReliability";
import FactsFooter from "../../components/Facts/FactsFooter";
import { useUser } from "../../Contexts/UserContext";
import ReturnBtn from "../../components/Global/ReturnBtn";
import Loginfooter from "../../components/Global/LoginFooter";
import Settings from "../../components/Global/Settings";
export default function FactsPage() {
  const { user } = useUser();
  const isLoggedIn = !!user?.id;
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="w-full min-h-screen flex flex-col items-center px-7 py-8 color-transition"
    >
      {!isLoggedIn && (
        <motion.div
          variants={sectionVariants}
          className="w-full color-transition"
        >
          <ReturnBtn />
        </motion.div>
      )}
      {!isLoggedIn && (
        <div className="fixed bottom-4 left-4 z-50 w-fit">
          <Settings size="sm" />
        </div>
      )}
      <div className={`w-full ${isLoggedIn ? "max-w-[1800px]" : "max-w-6xl"} space-y-16 relative color-transition`}>
        <FactsHeader />

        <FactsSources />

        <FactsReliability />

        <FactsFooter />
      </div>
      {!isLoggedIn && (
        <div className="flex justify-center gap-4 w-full z-50 color-transition">
          <Loginfooter />
        </div>
      )}
    </motion.div>
  );
}
