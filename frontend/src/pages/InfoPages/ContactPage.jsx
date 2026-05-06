import { motion } from "framer-motion";
import ContactHeader from "../../components/Contact/ContactHeader";
import ContactInfoGrid from "../../components/Contact/ContactInfoGrid";
import ContactForm from "../../components/Contact/ContactForm";
import contactInfo from "../../components/Contact/ContactData";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import { useUser } from "../../Contexts/UserContext";
import ReturnBtn from "../../components/Info/ReturnBtn";
export default function ContactPage() {
  const { user } = useUser();
  const isLoggedIn = !!user?.id;

  return (
    <div className="relative min-h-screen overflow-hidden color-transition">
      {/* BACKGROUND GLOW (ONLY ONCE) */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {!isLoggedIn && (
        <div className="fixed top-6 left-6 z-50">
          <ReturnBtn />
        </div>
      )}

      {/* PAGE CONTENT */}
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="show"
        className="px-4 sm:px-6 py-10 sm:py-16 flex justify-center"
      >
        <div className="w-full max-w-6xl relative">
          <motion.div variants={sectionVariants}>
            <ContactHeader />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <ContactInfoGrid contactInfo={contactInfo} />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
