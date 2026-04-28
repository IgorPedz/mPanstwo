import { useState } from "react";
import { useUser } from "../Contexts/UserContext";
import Footer from "../components/Info/Footer";
import ReturnBtn from "../components/Info/ReturnBtn";
import HelpHero from "../components/Help/HelpHero";
import SearchBar from "../components/Help/SearchBar";
import FAQList from "../components/Help/FAQList";
import FAQTabs from "../components/Help/FAQTabs";

const faqData = [
    { category: "Konto", question: "Jak mogę założyć konto?", answer: "Kliknij przycisk rejestracji i wypełnij formularz." },
    { category: "Konto", question: "Czy mogę zmienić swoje dane osobowe?", answer: "Tak, dane edytujesz w sekcji Profil." },
    { category: "Bezpieczeństwo", question: "Jak mogę zresetować hasło?", answer: "Kliknij 'Nie pamiętam hasła' i postępuj według instrukcji." },
    { category: "Kontakt", question: "Jak skontaktować się z obsługą klienta?", answer: "Formularz kontaktowy lub e-mail kontakt@twojadomena.pl." },
    { category: "Transakcje", question: "Czy mogę anulować zamówienie?", answer: "Tak, zamówienie można anulować w ciągu 24h od złożenia." },
    { category: "Płatności", question: "Jak zmienić metodę płatności?", answer: "Edytuj metodę płatności w ustawieniach konta." },
];

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Wszystkie");

    const { user } = useUser();
    const isLoggedIn = !!user?.id;

    const categories = ["Wszystkie", ...new Set(faqData.map(f => f.category))];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFAQs = faqData.filter(faq => {
        const matchesCategory =
            activeCategory === "Wszystkie" || faq.category === activeCategory;

        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="w-full min-h-full flex flex-col text-gray-800 dark:text-gray-200">
            {!isLoggedIn && <ReturnBtn />}

            <HelpHero />


            <div className="w-full mt-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                <FAQTabs categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

                <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>

            <div className="w-full mt-10 px-6 mx-auto">
                <FAQList
                    faqs={filteredFAQs}
                    openIndex={openIndex}
                    onToggle={toggleFAQ}
                />
            </div>

            {!isLoggedIn && <Footer />}
        </div>
    );
} 