import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Info/Footer";
import heroImage from "../../public/images/heroImageContact.jpg";
import ReturnBtn from "../components/Info/ReturnBtn";
import { useUser } from "../Contexts/UserContext";
export default function ContactPage() {
    const { user } = useUser();
    const isLoggedIn = !!user?.id;
    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 color-transition">

            {!isLoggedIn && (<ReturnBtn />)}

            <div className="relative w-full h-96 md:h-[480px] flex items-center justify-center overflow-hidden color-transition">
                <img
                    src={heroImage}
                    alt="Kontakt hero"
                    className="absolute w-full h-full object-cover scale-105 color-transition"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-sm color-transition"></div>

                <div className="relative text-center px-6 color-transition">
                    <h1 className="text-5xl md:text-6xl font-bold text-white color-transition">
                        Skontaktuj się z nami
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl mx-auto color-transition">
                        Masz pytania? Napisz lub zadzwoń — chętnie pomożemy
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 -mt-20 px-6 md:px-16 relative z-10 color-transition">

                <div className="flex-1 group cursor-pointer">
                    <div className="rounded-3xl p-[1px] bg-gradient-to-br from-blue-500/30 to-indigo-500/30 group-hover:from-blue-500/60 group-hover:to-indigo-500/60 transition-all duration-300">
                        <div className="flex flex-col items-center gap-3 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl backdrop-blur-xl color-transition">
                            <EnvelopeIcon className="w-7 h-7 text-blue-500 color-transition" />
                            <div className="text-center color-transition">
                                <div className="font-semibold text-lg color-transition">E-mail</div>
                                <div className="text-gray-500 dark:text-gray-400 color-transition">
                                    kontakt@twojadomena.pl
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 group cursor-pointer">
                    <div className="rounded-3xl p-[1px] bg-gradient-to-br from-green-500/30 to-emerald-500/30 group-hover:from-green-500/60 group-hover:to-emerald-500/60 transition-all duration-300">
                        <div className="flex flex-col items-center gap-3 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl backdrop-blur-xl color-transition">
                            <PhoneIcon className="w-7 h-7 text-green-500 color-transition" />
                            <div className="text-center color-transition">
                                <div className="font-semibold text-lg color-transition">Telefon</div>
                                <div className="text-gray-500 dark:text-gray-400 color-transition">
                                    +48 123 456 789
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 group cursor-pointer">
                    <div className="rounded-3xl p-[1px] bg-gradient-to-br from-red-500/30 to-pink-500/30 group-hover:from-red-500/60 group-hover:to-pink-500/60 transition-all duration-300">
                        <div className="flex flex-col items-center gap-3 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl backdrop-blur-xl color-transition">
                            <MapPinIcon className="w-7 h-7 text-red-500 color-transition" />
                            <div className="text-center color-transition">
                                <div className="font-semibold text-lg color-transition">Adres</div>
                                <div className="text-gray-500 dark:text-gray-400 color-transition">
                                    ul. Przykładowa 12, 00-000 Miasto
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center px-6 md:px-16 mt-16 color-transition">
                <form className="w-full max-w-2xl rounded-3xl p-[1px] bg-gradient-to-br from-blue-500/30 to-indigo-500/30">

                    <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-2xl space-y-5 backdrop-blur-xl color-transition">

                        <h2 className="text-2xl font-semibold text-center color-transition">
                            Napisz do nas
                        </h2>

                        <input
                            type="text"
                            placeholder="Imię i nazwisko"
                            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none color-transition"
                        />

                        <input
                            type="email"
                            placeholder="Twój e-mail"
                            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none color-transition"
                        />

                        <textarea
                            placeholder="Wiadomość"
                            rows={5}
                            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none color-transition"
                        />

                        <button
                            type="submit"
                            className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition-all duration-300 cursor-pointer color-transition"
                        >
                            Wyślij wiadomość
                        </button>

                    </div>
                </form>
            </div>
            {!isLoggedIn && (<Footer />)}
        </div>
    );
}
