import { motion } from "framer-motion";
import DocumentsHeader from "../../components/Documents/DocumentsHeader";
import DocumentsGrid from "../../components/Documents/DocumentsGrid";
import DocumentsFooterInfo from "../../components/Documents/DocumentsFooter";
import documents from "../../components/Documents/DocumentsData";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import { useUser } from "../../Contexts/UserContext";
import ReturnBtn from "../../components/Global/ReturnBtn";
import Loginfooter from "../../components/Global/LoginFooter";

export default function DocumentsPage() {
  const { user } = useUser();
  const isLoggedIn = !!user?.id;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen w-full px-6 py-12 md:py-20 flex justify-center color-transition"
    >
      <div className="w-full max-w-6xl space-y-16 color-transition">
        {!isLoggedIn && (
          <motion.div
            variants={sectionVariants}
            className="w-full color-transition"
          >
            <ReturnBtn />
          </motion.div>
        )}

        <motion.div
          variants={sectionVariants}
          className="w-full color-transition"
        >
          <DocumentsHeader />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="w-full color-transition"
        >
          <DocumentsGrid documents={documents} />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="w-full color-transition justify-center flex"
        >
          {!isLoggedIn && <Loginfooter />}
        </motion.div>
      </div>
    </motion.div>
  );
}
