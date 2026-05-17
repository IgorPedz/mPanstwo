import { useMemo } from "react";
import { faqData } from "../components/FAQ/FAQData";

export function useFAQ(searchTerm, activeCategory) {
  const categories = useMemo(() => {
    return ["Wszystkie", ...new Set(faqData.map((f) => f.category))];
  }, []);

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory =
        activeCategory === "Wszystkie" ||
        faq.category === activeCategory;

      const matchesSearch = faq.question
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return {
    faqs: filteredFAQs,
    categories,
  };
}