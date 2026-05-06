import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function ContactForm() {
  return (
    <div>
      <div className="relative">
        {/* glow */}
        <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-xl opacity-70 pointer-events-none" />

        <div className="relative rounded-2xl border border-gray-200/70 dark:border-white/10 p-5 sm:p-8 md:p-10 shadow-xl backdrop-blur-md bg-white/60 dark:bg-black/40 color-transition">
          <form
            className="space-y-5 sm:space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-400 dark:text-gray-500">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="twoj@email.com"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 color-transition text-gray-900 dark:text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-400 dark:text-gray-500">
                  Temat
                </label>

                <input
                  type="text"
                  placeholder="W czym możemy pomóc?"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 color-transition text-gray-900 dark:text-gray-200"
                />
              </div>
            </div>

            {/* textarea */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-400 dark:text-gray-500">
                Wiadomość
              </label>

              <textarea
                rows={5}
                placeholder="Opisz swój problem..."
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none color-transition text-gray-900 dark:text-gray-200"
              />
            </div>

            {/* button */}
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-4 rounded-xl transition color-transition active:scale-[0.99]">
              Wyślij wiadomość
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
