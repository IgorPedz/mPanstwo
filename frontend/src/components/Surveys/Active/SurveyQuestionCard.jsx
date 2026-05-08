import { motion } from "framer-motion";
import ICON_MAP from "../../../Utils/Maps/Icons";

const optionVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.99 },
};

const SurveyQuestionCard = ({
  question,
  currentStep,
  totalSteps,
  onSelect,
  selectedValue,
}) => {
  const CheckIcon = ICON_MAP["check"] || ICON_MAP["zap"];

  if (!question) return null;

  const options = question.options ?? [];

  return (
    <motion.div
      key={question.id}
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >

      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">
          Pytanie {currentStep} / {totalSteps}
        </p>

        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2 leading-tight">
          {question.title}
        </h2>

        {question.description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
            {question.description}
          </p>
        )}
      </div>

      {/* OPTIONS */}
      <div className="flex flex-col gap-3">
        {options.map((opt, index) => {
          const isSelected = selectedValue === opt.value;

          return (
            <motion.button
              key={opt.value}
              variants={optionVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onSelect(opt.value)}
              className={`
                w-full
                flex items-center justify-between
                text-left
                px-5 py-4
                rounded-2xl
                border
                transition-all
                font-semibold
                ${
                  isSelected
                    ? `
                      border-blue-500
                      bg-blue-50 dark:bg-blue-900/20
                    `
                    : `
                      border-slate-200 dark:border-slate-800
                      bg-slate-50 dark:bg-slate-950
                      hover:border-blue-400
                    `
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    h-9 w-9
                    rounded-xl
                    flex items-center justify-center
                    text-sm font-black
                    transition-all
                    ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-700"
                    }
                  `}
                >
                  {index + 1}
                </div>

                <span
                  className={`
                    ${
                      isSelected
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-slate-800 dark:text-slate-200"
                    }
                  `}
                >
                  {opt.label}
                </span>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center"
                >
                  <CheckIcon className="h-5 w-5" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SurveyQuestionCard;