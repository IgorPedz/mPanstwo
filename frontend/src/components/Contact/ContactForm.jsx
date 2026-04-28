export default function ContactForm() {
    return (
        <div className="flex justify-center px-6 md:px-16 mt-20 mb-10">
            <form className="w-full max-w-2xl">
                <div
                    className="
                        bg-white/80 dark:bg-gray-900/70
                        backdrop-blur
                        border border-gray-200 dark:border-gray-800
                        rounded-2xl p-8 md:p-10 space-y-5
                        shadow-lg transition-colors duration-300
                        color-transition
                    "
                >
                    <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white transition-colors duration-300">
                        Napisz do nas
                    </h2>

                    <input
                        type="text"
                        placeholder="Imię i nazwisko"
                        className="
                            w-full p-4 rounded-xl
                            border border-gray-200 dark:border-gray-800
                            bg-transparent
                            text-gray-900 dark:text-gray-100
                            placeholder-gray-400 dark:placeholder-gray-500
                            outline-none
                            transition-colors duration-300
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                        "
                    />

                    <input
                        type="email"
                        placeholder="Twój e-mail"
                        className="
                            w-full p-4 rounded-xl
                            border border-gray-200 dark:border-gray-800
                            bg-transparent
                            text-gray-900 dark:text-gray-100
                            placeholder-gray-400 dark:placeholder-gray-500
                            outline-none
                            transition-colors duration-300
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                        "
                    />

                    <textarea
                        placeholder="Wiadomość"
                        rows={5}
                        className="
                            w-full p-4 rounded-xl
                            border border-gray-200 dark:border-gray-800
                            bg-transparent
                            text-gray-900 dark:text-gray-100
                            placeholder-gray-400 dark:placeholder-gray-500
                            outline-none
                            transition-colors duration-300
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                        "
                    />

                    <button
                        type="submit"
                        className="
                            w-full py-4 rounded-xl
                            bg-gradient-to-r from-blue-600 to-blue-700
                            hover:from-blue-700 hover:to-blue-800
                            text-white font-semibold
                            transition-all duration-300
                            transform hover:scale-[1.03] active:scale-[0.97]
                            shadow-md hover:shadow-lg
                        "
                    >
                        Wyślij wiadomość
                    </button>
                </div>
            </form>
        </div>
    );
}