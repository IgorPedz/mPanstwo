import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { faqData } from "../components/FAQ/FAQData";

export function useFAQ(searchTerm = "", activeCategory = "all") {
  const { t } = useTranslation();

  const categories = useMemo(() => {
    return ["all", ...new Set(faqData.map((f) => f.category))];
  }, []);

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory =
        !activeCategory ||
        activeCategory === "all" ||
        faq.category === activeCategory;

      const question = t(`faq.items.${faq.key}.question`, "") || "";

      const matchesSearch = question
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory, t]);

  return {
    faqs: filteredFAQs,
    categories,
  };
}