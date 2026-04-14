import Footer from "../components/Info/Footer";
import heroImage from "../../public/images/heroImageContact.jpg";
import ReturnBtn from "../components/Info/ReturnBtn";
import { DocumentTextIcon, ShieldCheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useUser } from "../Contexts/UserContext";
export default function DocumentsPage() {
    const documents = [
        { title: "Regulamin", description: "Zasady korzystania z serwisu", icon: <DocumentTextIcon className="w-6 h-6 text-blue-500 color-transition" />, badge: "Nowy" },
        { title: "Polityka Prywatności", description: "Jak chronimy Twoje dane", icon: <ShieldCheckIcon className="w-6 h-6 text-green-500 color-transition" />, badge: "Ważne" },
        { title: "RODO", description: "Twoje prawa w UE", icon: <ClipboardDocumentIcon className="w-6 h-6 text-purple-500 color-transition" />, badge: "Aktualizacja" },
    ];
    const { user } = useUser();
    const isLoggedIn = !!user?.id;
    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 color-transition">
            {!isLoggedIn && (<ReturnBtn />)}
            <div className="relative w-full h-80 md:h-[400px] flex items-center justify-center overflow-hidden color-transition">
                <img
                    src={heroImage}
                    alt="Documents hero"
                    className="absolute w-full h-full object-cover scale-105 color-transition"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm color-transition"></div>
                <div className="relative text-center px-6 md:px-0 color-transition">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg color-transition">
                        Dokumenty i regulaminy
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-white drop-shadow-md color-transition">
                        Wszystkie ważne dokumenty dotyczące naszej platformy w jednym miejscu
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 color-transition">
                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="group relative cursor-pointer rounded-3xl p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 color-transition border border-transparent hover:border-gradient-to-br from-blue-400 to-purple-500"
                    >
                        <div className="flex items-center justify-between mb-4 color-transition">
                            <div className="flex items-center gap-3 color-transition">
                                {doc.icon}
                                <h2 className="text-xl font-semibold color-transition">{doc.title}</h2>
                            </div>
                            {doc.badge && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white color-transition">
                                    {doc.badge}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 color-transition">{doc.description}</p>
                    </div>
                ))}
            </div>
            {!isLoggedIn && (<Footer />)}
        </div>
    );
}