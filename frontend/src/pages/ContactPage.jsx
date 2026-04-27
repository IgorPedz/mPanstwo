import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Info/Footer";
import heroImage from "../../public/images/heroImageContact.jpg";
import ReturnBtn from "../components/Info/ReturnBtn";
import { useUser } from "../Contexts/UserContext";

export default function ContactPage() {
    const { user } = useUser();
    const isLoggedIn = !!user?.id;

    return (
        <div className="w-full min-h-screen flex flex-col text-gray-800 dark:text-gray-200">

            {!isLoggedIn && <ReturnBtn />}

            <div className="relative w-full h-96 md:h-[480px] flex items-center justify-center overflow-hidden">

                <img
                    src={heroImage}
                    alt="Kontakt hero"
                    className="absolute w-full h-full object-cover scale-105"
                />

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative text-center px-6">

                    <h1 className="text-5xl md:text-6xl font-bold text-white">
                        Skontaktuj się z nami
                    </h1>

                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
                        Masz pytania? Napisz lub zadzwoń — chętnie pomożemy
                    </p>

                </div>
            </div>

            {/* CONTACT CARDS */}
            <div className="flex flex-col md:flex-row gap-6 -mt-20 px-6 md:px-16 relative z-10">

                {/* EMAIL */}
                <div className="flex-1">
                    <div className="
                        flex flex-col items-center gap-3 p-8
                        border border-gray-200 dark:border-gray-800
                        rounded-2xl
                    ">
                        <EnvelopeIcon className="w-7 h-7 text-blue-500" />
                        <div className="text-center">
                            <div className="font-semibold text-lg">E-mail</div>
                            <div className="text-gray-500 dark:text-gray-400">
                                kontakt@twojadomena.pl
                            </div>
                        </div>
                    </div>
                </div>

                {/* PHONE */}
                <div className="flex-1">
                    <div className="
                        flex flex-col items-center gap-3 p-8
                        border border-gray-200 dark:border-gray-800
                        rounded-2xl
                    ">
                        <PhoneIcon className="w-7 h-7 text-green-500" />
                        <div className="text-center">
                            <div className="font-semibold text-lg">Telefon</div>
                            <div className="text-gray-500 dark:text-gray-400">
                                +48 123 456 789
                            </div>
                        </div>
                    </div>
                </div>

                {/* ADDRESS */}
                <div className="flex-1">
                    <div className="
                        flex flex-col items-center gap-3 p-8
                        border border-gray-200 dark:border-gray-800
                        rounded-2xl
                    ">
                        <MapPinIcon className="w-7 h-7 text-red-500" />
                        <div className="text-center">
                            <div className="font-semibold text-lg">Adres</div>
                            <div className="text-gray-500 dark:text-gray-400">
                                ul. Przykładowa 12, 00-000 Miasto
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* FORM */}
            <div className="flex justify-center px-6 md:px-16 mt-16">

                <form className="w-full max-w-2xl">

                    <div className="
                        border border-gray-200 dark:border-gray-800
                        rounded-2xl p-8 md:p-10 space-y-5
                    ">

                        <h2 className="text-2xl font-semibold text-center">
                            Napisz do nas
                        </h2>

                        <input
                            type="text"
                            placeholder="Imię i nazwisko"
                            className="
                                w-full p-4 rounded-xl
                                border border-gray-200 dark:border-gray-800
                                bg-transparent
                                outline-none
                            "
                        />

                        <input
                            type="email"
                            placeholder="Twój e-mail"
                            className="
                                w-full p-4 rounded-xl
                                border border-gray-200 dark:border-gray-800
                                bg-transparent
                                outline-none
                            "
                        />

                        <textarea
                            placeholder="Wiadomość"
                            rows={5}
                            className="
                                w-full p-4 rounded-xl
                                border border-gray-200 dark:border-gray-800
                                bg-transparent
                                outline-none
                            "
                        />

                        <button
                            type="submit"
                            className="
                                w-full py-4 rounded-xl
                                bg-blue-600 hover:bg-blue-700
                                text-white font-semibold
                                transition cursor-pointer
                            "
                        >
                            Wyślij wiadomość
                        </button>

                    </div>

                </form>

            </div>

            {!isLoggedIn && <Footer />}
        </div>
    );
}