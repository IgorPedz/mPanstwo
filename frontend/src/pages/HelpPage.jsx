import { ChevronDownIcon, MagnifyingGlassIcon, TagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import heroImage from "../../public/images/heroImageContact.jpg";
import Footer from "../components/Info/Footer";
import ReturnBtn from "../components/Info/ReturnBtn";
const faqData = [
    { category: "Konto", question: "Jak mogę założyć konto?", answer: "Kliknij przycisk rejestracji i wypełnij formularz." },
    { category: "Konto", question: "Czy mogę zmienić swoje dane osobowe?", answer: "Tak, dane edytujesz w sekcji Profil." },
    { category: "Bezpieczeństwo", question: "Jak mogę zresetować hasło?", answer: "Kliknij 'Nie pamiętam hasła' i postępuj według instrukcji." },
    { category: "Kontakt", question: "Jak skontaktować się z obsługą klienta?", answer: "Formularz kontaktowy lub e-mail kontakt@twojadomena.pl." },
    { category: "Transakcje", question: "Czy mogę anulować zamówienie?", answer: "Tak, zamówienie można anulować w ciągu 24h od złożenia." },
    { category: "Płatności", question: "Jak zmienić metodę płatności?", answer: "Edytuj metodę płatności w ustawieniach konta." },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Wszystkie");

    const categories = ["Wszystkie", ...new Set(faqData.map(faq => faq.category))];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFAQs = faqData.filter(faq => {
        const matchesCategory = activeCategory === "Wszystkie" || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 color-transition">
            <ReturnBtn />
            <div className="relative w-full h-80 md:h-[420px] flex items-center justify-center overflow-hidden color-transition">
                <img
                    src={heroImage}
                    alt="FAQ hero"
                    className="absolute w-full h-full object-cover scale-105 color-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-sm color-transition"></div>

                <div className="relative text-center px-6 color-transition">
                    <h1 className="text-5xl md:text-6xl font-bold text-white color-transition">FAQ</h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl mx-auto color-transition">
                        Najczęściej zadawane pytania dotyczące naszej platformy
                    </p>
                </div>
            </div>

            <div className="w-full mt-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4 color-transition">

                <div className="overflow-x-auto scrollbar-hide color-transition">
                    <div className="flex bg-gray-200 dark:bg-gray-800 rounded-full p-1 w-max color-transition">

                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 cursor-pointer color-transition
                  ${activeCategory === cat
                                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md"
                                        : "text-gray-500 dark:text-gray-400"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}

                    </div>
                </div>

                <div className="relative w-full md:w-80 color-transition">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 color-transition" />
                    <input
                        type="text"
                        placeholder="Szukaj pytania..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm color-transition"
                    />
                </div>
            </div>

            <div className="w-full mt-10 px-6 space-y-4 color-transition">
                {filteredFAQs.length > 0 ? filteredFAQs.map((faq, index) => (
                    <div
                        key={index}
                        onClick={() => toggleFAQ(index)}
                        className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer color-transition"
                    >
                        <div className="flex items-center justify-between gap-4 p-6 color-transition">

                            <span className="text-lg font-semibold color-transition">
                                {faq.question}
                            </span>

                            <div className="flex items-center gap-4 color-transition">

                                <span className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl
                  bg-blue-100 text-blue-700
                  dark:bg-blue-900 dark:text-blue-300
                  shadow-md color-transition"
                                >
                                    <TagIcon className="w-4 h-4 opacity-80 color-transition" />
                                    {faq.category}
                                </span>

                                <ChevronDownIcon
                                    className={`w-6 h-6 transition-transform duration-300 color-transition ${openIndex === index ? "rotate-180 text-blue-500" : ""
                                        }`}
                                />
                            </div>
                        </div>

                        <div className={`px-6 transition-all duration-300 overflow-hidden color-transition ${openIndex === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                            }`}>
                            <p className="text-gray-600 dark:text-gray-400 color-transition">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 color-transition">
                        Brak pasujących pytań.
                    </p>
                )}
            </div>
            <Footer />
        </div>
    );
}

