import { useState } from "react";
import { useUser } from "../../Contexts/UserContext";
import ReturnBtn from "../../components/Global/ReturnBtn";
import SearchBar from "../../components/FAQ/FAQSearchBar";
import FAQList from "../../components/FAQ/FAQList";
import FAQTabs from "../../components/FAQ/FAQTabs";
import FAQHeader from "../../components/FAQ/FAQHeader";
import Loginfooter from "../../components/Global/LoginFooter";
import { faqData } from "../../components/FAQ/FAQData";
import { motion } from "framer-motion";
import { sectionVariants, pageVariants } from "../../Utils/Animations";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Wszystkie");

  const { user } = useUser();
  const isLoggedIn = !!user?.id;

  const categories = ["Wszystkie", ...new Set(faqData.map((f) => f.category))];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "Wszystkie" || faq.category === activeCategory;
    const matchesSearch = faq.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:py-20 relative color-transition"
    >
      <div className="w-full max-w-6xl space-y-12 color-transition">
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
          <FAQHeader />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="w-full flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between color-transition"
        >
          <div className="flex-1 color-transition">
            <FAQTabs
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
          <div className="w-full lg:w-80 color-transition">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          className="w-full color-transition"
        >
          <div className="w-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden color-transition">
            <FAQList
              faqs={filteredFAQs}
              openIndex={openIndex}
              onToggle={(i) => setOpenIndex(openIndex === i ? null : i)}
            />
          </div>
        </motion.div>
      </div>
      {!isLoggedIn && (
        <div className="flex justify-center gap-4 w-full z-50 color-transition">
          <Loginfooter />
        </div>
      )}
    </motion.div>
  );
}
