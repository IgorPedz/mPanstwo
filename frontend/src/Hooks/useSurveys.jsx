import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useUser } from "../Contexts/UserContext";
import useFormatDate from "../Utils/Dynamic/useFormatDate";

export default function useSurveys(open, survey, onClose, onInfo, onFinished) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [infoMessage, setInfoMessage] = useState("");
  const [infoType, setInfoType] = useState("success");
  const questions = useMemo(() => survey?.questions || [], [survey]);
  const question = questions[currentStep];

  const { user: authUser } = useUser();
  const { t } = useTranslation();

  const storageKey = useMemo(
    () => (survey?.id ? `survey_${survey.id}` : null),
    [survey?.id],
  );

  useEffect(() => {
    if (!open || !survey?.id) return;

    const saved = storageKey ? localStorage.getItem(storageKey) : null;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrentStep(parsed.step < questions.length ? parsed.step : 0);
      } catch {
        setAnswers({});
        setCurrentStep(0);
      }
    } else {
      setAnswers({});
      setCurrentStep(0);
    }
  }, [open, survey?.id, storageKey, questions.length]);

  useEffect(() => {
    if (!open || !storageKey) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        step: currentStep,
        answers,
      }),
    );
  }, [answers, currentStep, storageKey, open]);

  const handleFinish = async (finalAnswers) => {
    try {
      await axios.post(`http://localhost:5000/surveys/${survey.id}/submit`, {
        userId: authUser.id,
        answers: finalAnswers,
      });

      onInfo?.(
        t("common.messages.surveyFinished", {
          title: survey.title,
          reward: survey.reward,
          deadline: useFormatDate(survey.deadline),
        }),
        "success"
      );

      onFinished?.(survey.id);

      onClose?.();
    } catch (err) {
      console.error(err);

      onInfo?.(t("common.messages.saveSurveyError"), "error");
    }
  };

  const handleAnswer = (value) => {
    if (!question) return;

    const updated = {
      ...answers,
      [question.id]: value,
    };

    setAnswers(updated);

    const nextStep = currentStep + 1;

    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
    } else {
      handleFinish(updated);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const progress =
    questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0;

  return {
    currentStep,
    question,
    questions,
    handleAnswer,
    handleBack,
    progress,
    infoMessage,
    infoType,
  };
}
