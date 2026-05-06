import { useState } from "react";
import { useUser } from "../../Contexts/UserContext";
import Footer from "../../components/Info/Footer";
import ReturnBtn from "../../components/Info/ReturnBtn";
import SearchBar from "../../components/FAQ/FAQSearchBar";
import FAQList from "../../components/FAQ/FAQList";
import FAQTabs from "../../components/FAQ/FAQTabs";
import FAQHeader from "../../components/FAQ/FAQHeader";
import { faqData } from "../../components/FAQ/FAQData";
import {motion} from "framer-motion";
import { sectionVariants, pageVariants } from "../../Utils/Animations";

export default function HelpPage() {
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
      className="w-full min-h-screen flex flex-col items-center text-gray-800 dark:text-gray-200 px-4 sm:px-6 py-10 relative overflow-hidden color-transition"
    >
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {!isLoggedIn && (
        <motion.div variants={sectionVariants} className="w-full max-w-6xl">
          <ReturnBtn />
        </motion.div>
      )}

      <motion.div
        variants={sectionVariants}
        className="w-full max-w-4xl text-center mt-10 sm:mt-14"
      >
        <FAQHeader />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        className="w-full max-w-6xl mt-10 sm:mt-14 flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center justify-between"
      >
        <div className="flex-1 color-transition">
          <FAQTabs
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <div className="w-full lg:w-[360px] color-transition">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </motion.div>

      <motion.div variants={sectionVariants} className="w-full mt-10 sm:mt-12">
        <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-sm p-2 sm:p-4 color-transition">
          <FAQList
            faqs={filteredFAQs}
            openIndex={openIndex}
            onToggle={(i) => setOpenIndex(openIndex === i ? null : i)}
          />
        </div>
      </motion.div>

      {!isLoggedIn && (
        <motion.div
          variants={sectionVariants}
          className="w-full max-w-6xl mt-16 color-transition"
        >
          <Footer />
        </motion.div>
      )}
    </motion.div>
  );
}
