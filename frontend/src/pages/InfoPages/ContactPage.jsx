import { motion } from "framer-motion";
import ContactHeader from "../../components/Contact/ContactHeader";
import ContactInfoGrid from "../../components/Contact/ContactInfoGrid";
import ContactForm from "../../components/Contact/ContactForm";
import contactInfo from "../../components/Contact/ContactData";
import { pageVariants, sectionVariants } from "../../Utils/Animations";
import { useUser } from "../../Contexts/UserContext";
import ReturnBtn from "../../components/Global/ReturnBtn";
import Loginfooter from "../../components/Global/LoginFooter";
import Settings from "../../components/Global/Settings";

export default function ContactPage() {
  const { user } = useUser();
  const isLoggedIn = !!user?.id;

  return (
    <div className="relative min-h-screen w-full color-transition">
      {!isLoggedIn && (
        <div className="fixed top-1 left-1 z-50 color-transition">
          <ReturnBtn />
        </div>
      )}
      {!isLoggedIn && (
        <div className="fixed bottom-4 left-4 z-50 w-fit">
          <Settings size="sm" />
        </div>
      )}

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="show"
        className="px-7 py-8 flex justify-center w-full color-transition"
      >
        <div className={`w-full ${isLoggedIn ? "max-w-[1800px]" : "max-w-6xl"} space-y-16 relative color-transition`}>
          <motion.div
            variants={sectionVariants}
            className="w-full color-transition"
          >
            <ContactHeader />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            className="w-full color-transition"
          >
            <ContactInfoGrid contactInfo={contactInfo} />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            className="w-full color-transition"
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
      {!isLoggedIn && (
        <div className="flex justify-center gap-4 w-full z-50 color-transition">
          <Loginfooter />
        </div>
      )}
    </div>
  );
}
