import { useState } from "react";
import { useUser } from "../../Contexts/UserContext";
import { motion } from "framer-motion";

import ReturnBtn from "../../components/Global/ReturnBtn";
import SearchBar from "../../components/FAQ/FAQSearchBar";
import FAQList from "../../components/FAQ/FAQList";
import FAQTabs from "../../components/FAQ/FAQTabs";
import FAQHeader from "../../components/FAQ/FAQHeader";
import Loginfooter from "../../components/Global/LoginFooter";

import { useFAQ } from "../../Hooks/useFAQ";
import Settings from "../../components/Global/Settings";

import { sectionVariants, pageVariants } from "../../Utils/Animations";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { user } = useUser();
  const isLoggedIn = !!user?.id;

  const { faqs: filteredFAQs, categories } = useFAQ(searchTerm, activeCategory);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="w-full min-h-screen flex flex-col items-center px-7 py-8 relative color-transition"
    >
      <div
        className={`w-full ${isLoggedIn ? "max-w-[1800px]" : "max-w-6xl"} space-y-12 color-transition`}
      >
        {!isLoggedIn && <ReturnBtn />}
        {!isLoggedIn && (
          <div className="fixed bottom-4 left-4 z-50 w-fit">
            <Settings size="sm" />
          </div>
        )}

        <FAQHeader />

        <motion.div
          variants={sectionVariants}
          className="w-full flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between"
        >
          <div className="flex-1">
            <FAQTabs
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          <div className="w-full lg:w-80">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </motion.div>

        <div className="w-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
          <FAQList
            faqs={filteredFAQs}
            openIndex={openIndex}
            onToggle={(i) => setOpenIndex(openIndex === i ? null : i)}
          />
        </div>
      </div>

      {!isLoggedIn && <Loginfooter />}
    </motion.div>
  );
}
