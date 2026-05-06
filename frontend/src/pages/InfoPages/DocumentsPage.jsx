import { motion } from "framer-motion";
import DocumentsHeader from "../../components/Documents/DocumentsHeader";
import DocumentsGrid from "../../components/Documents/DocumentsGrid";
import DocumentsFooterInfo from "../../components/Documents/DocumentsFooter";
import documents from "../../components/Documents/DocumentsData";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import { useUser } from "../../Contexts/UserContext";
import ReturnBtn from "../../components/Info/ReturnBtn";

export default function DocumentsPage() {
  const { user } = useUser();
  const isLoggedIn = !!user?.id;
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen px-6 py-20 flex justify-center color-transition"
    >
      <div className="w-full max-w-6xl">
        {!isLoggedIn && (
          <motion.div variants={sectionVariants} className="w-full max-w-6xl">
            <ReturnBtn />
          </motion.div>
        )}

        <motion.div variants={sectionVariants}>
          <DocumentsHeader />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <DocumentsGrid documents={documents} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <DocumentsFooterInfo />
        </motion.div>
      </div>
    </motion.div>
  );
}
