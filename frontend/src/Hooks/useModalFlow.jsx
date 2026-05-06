import { useState } from "react";

export function useModalFlow(flow) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const reset = () => {
    setStep(1);
    setStatus(null);
    setLoading(false);
    setOpen(false);
  };

  return {
    step,
    setStep,
    status,
    setStatus,
    loading,
    setLoading,
    open,
    setOpen,
    reset,
    flow,
  };
}