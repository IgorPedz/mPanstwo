import { motion } from "framer-motion";
import DocumentCard from "./DocumentsCard";
import { itemVariants, containerVariants } from "../../Utils/Animations";

export default function DocumentsGrid({ documents }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {documents.map((doc) => (
        <motion.div
          key={doc.title}
          variants={itemVariants}
          whileHover={{ y: -3 }}
        >
          <DocumentCard doc={doc} />
        </motion.div>
      ))}
    </motion.div>
  );
}