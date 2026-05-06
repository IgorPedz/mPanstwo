import { motion } from "framer-motion";
import ContactInfoCard from "./ContactInfoCard";
import { containerVariants, itemVariants } from "../../Utils/Animations";

export default function ContactInfoGrid({ contactInfo }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
    >
      {contactInfo.map((info) => (
        <motion.div key={info.label} variants={itemVariants}>
          <ContactInfoCard info={info} />
        </motion.div>
      ))}
    </motion.div>
  );
}