import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModuleRenderer from "./ModuleRenderer";

export default function ModuleModal({
  activeModule,
  lesson,
  courseSlug, // np. "parlamentary_course"
  lessonSlug, // np. "l1"
  setActiveModule,
  completeModule,
}) {
  const { t, i18n } = useTranslation();

  if (!activeModule || !lesson) return null;

  // 1. Pobieramy aktywny kod języka (np. 'pl', 'en')
  const currentLang = i18n.resolvedLanguage || i18n.language || "pl";

  // 2. Pobieramy surowy obiekt JSON bezpośrednio z pamięci i18n.
  // Sprawdzamy domyślny namespace 'translation' oraz potencjalny 'courses'
  const bundle =
    i18n.getResourceBundle(currentLang, "translation") ||
    i18n.getResourceBundle(currentLang, "courses") ||
    i18n.store?.data?.[currentLang]?.translation ||
    {};

  const courseData = bundle.courses?.[courseSlug] || bundle[courseSlug];
  const modulesArray = courseData?.lessons?.[lessonSlug]?.modules;

  // 🔍 LOG RATUNKOWY - jeśli to będzie puste, Twój JSON w ogóle nie jest załadowany do i18n
  console.log("--- DETEKTYW JS ---");
  console.log("Cała paczka języka:", bundle);
  console.log("Znaleziony kurs:", courseData);
  console.log("Wyciągnięta tablica modułów:", modulesArray);

  // 4. Pobieramy konkretny moduł z tablicy (lub bazy danych, jeśli i18n puste)
  const isI18nValid = Array.isArray(modulesArray);
  const translatedModuleData = isI18nValid
    ? modulesArray[activeModule.index]
    : null;

  // 5. Scalanie danych (tłumaczenie ma priorytet, baza jako fallback)
  const translatedTitle =
    translatedModuleData?.title || activeModule.title || "Analiza materiału";
  const translatedText = translatedModuleData?.text || activeModule.text || "";

  const modulesCount = isI18nValid
    ? modulesArray.length
    : lesson.modules?.length || 0;

  const currentModule = {
    ...activeModule,
    title: translatedTitle,
    text: translatedText,
  };

  const handleComplete = async () => {
    await completeModule(activeModule.id || activeModule.index);
    setActiveModule(null);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setActiveModule(null)}
      />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
        className="
          relative w-full max-w-2xl xl:max-w-3xl
          rounded-3xl border
          border-slate-200/80 dark:border-slate-800/80
          bg-white dark:bg-slate-900
          shadow-2xl overflow-hidden
          flex flex-col max-h-[85vh]
          text-slate-900 dark:text-slate-100
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800/60">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-md bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
              Moduł {activeModule.index + 1} z {modulesCount}
            </span>
            <h2 className="text-lg md:text-xl font-black mt-1.5">
              {translatedTitle}
            </h2>
          </div>

          <button
            onClick={() => setActiveModule(null)}
            className="w-9 h-9 rounded-xl grid place-items-center bg-slate-50 dark:bg-slate-800/50 text-slate-400 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-6 md:px-8 overflow-y-auto text-slate-600 dark:text-slate-300">
          <ModuleRenderer module={currentModule} />
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 flex justify-end">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            className="
              w-full sm:w-auto
              px-6 py-3.5
              rounded-xl
              font-black text-sm
              bg-gradient-to-r from-emerald-500 to-teal-600
              text-white
              hover:opacity-95
              shadow-md shadow-emerald-500/10
              transition-all
            "
          >
            {t("common.understand_and_complete", {
              defaultValue: "Zrozumiałem, oznacz jako ukończone",
            })}
          </motion.button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
