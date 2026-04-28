import Footer from "../components/Info/Footer";
import heroImage from "../../public/images/heroImageContact.jpg";
import ReturnBtn from "../components/Info/ReturnBtn";
import {
    DocumentTextIcon,
    ShieldCheckIcon,
    ClipboardDocumentIcon
} from "@heroicons/react/24/outline";
import { useUser } from "../Contexts/UserContext";

export default function DocumentsPage() {
    const documents = [
        {
            title: "Regulamin",
            description: "Zasady korzystania z serwisu",
            icon: <DocumentTextIcon className="w-6 h-6 text-blue-500" />,
            badge: "Nowy"
        },
        {
            title: "Polityka Prywatności",
            description: "Jak chronimy Twoje dane",
            icon: <ShieldCheckIcon className="w-6 h-6 text-green-500" />,
            badge: "Ważne"
        },
        {
            title: "RODO",
            description: "Twoje prawa w UE",
            icon: <ClipboardDocumentIcon className="w-6 h-6 text-purple-500" />,
            badge: "Aktualizacja"
        },
    ];

    const { user } = useUser();
    const isLoggedIn = !!user?.id;

    return (
        <div className="w-full min-h-screen text-gray-800 dark:text-gray-200 color-transition">

            {!isLoggedIn && <ReturnBtn />}

            {/* HERO */}
            <div className="relative w-full h-80 md:h-[400px] flex items-center justify-center overflow-hidden">

                <img
                    src={heroImage}
                    alt="Documents hero"
                    className="absolute w-full h-full object-cover scale-105"
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative text-center px-6 md:px-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Dokumenty i regulaminy
                    </h1>

                    <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Wszystkie ważne dokumenty dotyczące naszej platformy w jednym miejscu
                    </p>
                </div>
            </div>

            {/* GRID */}
            <div className="max-w-6xl mx-auto px-6 md:px-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="
                            group relative cursor-pointer rounded-2xl
                            border border-gray-200 dark:border-gray-800
                            p-6 color-transition

                            hover:bg-gray-50 dark:hover:bg-gray-900
                            hover:border-gray-300 dark:hover:border-gray-700
                        "
                    >
                        <div className="flex items-center justify-between mb-4">

                            <div className="flex items-center gap-3">
                                {doc.icon}
                                <h2 className="text-xl font-semibold color-transition group-hover:text-blue-500">
                                    {doc.title}
                                </h2>
                            </div>

                            {doc.badge && (
                                <span className="
                                    px-3 py-1 rounded-full text-xs font-semibold
                                    border border-gray-200 dark:border-gray-800
                                    text-gray-600 dark:text-gray-300
                                    color-transition

                                    group-hover:bg-gray-100 dark:group-hover:bg-gray-800
                                ">
                                    {doc.badge}
                                </span>
                            )}

                        </div>

                        <p className="text-gray-600 dark:text-gray-400 color-transition">
                            {doc.description}
                        </p>
                    </div>
                ))}

            </div>

            {!isLoggedIn && <Footer />}
        </div>
    );
}