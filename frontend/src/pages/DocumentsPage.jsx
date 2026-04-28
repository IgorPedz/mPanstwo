import Footer from "../components/Info/Footer";
import ReturnBtn from "../components/Info/ReturnBtn";
import DocumentsHero from "../components/Documents/DocumentsHero";
import DocumentCard from "../components/Documents/DocumentCard";
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

            <DocumentsHero />

            <div className="max-w-6xl mx-auto px-6 md:px-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {documents.map((doc, index) => (
                    <DocumentCard
                        key={index}
                        {...doc}
                    />
                ))}
            </div>

            {!isLoggedIn && <Footer />}
        </div>
    );
}