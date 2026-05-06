import ModalForm from "./ModalForm";

export default function ModalFlow({
  flow,
  hook,
  onSubmit,
}) {
  if (!flow || !flow.steps) return null;

  const {
    step,
    setStep,
    status,
    setStatus,
    loading,
    setLoading,
    open,
    reset,
  } = hook;

  const currentStep = flow?.steps?.[step];

  const handleSubmit = async (data) => {
    setLoading(true);
    const res = await onSubmit(data, step);
    setLoading(false);

    if (res.success) {
      reset();
    } else {
      setStatus({ type: "error", message: res.message });
    }
  };

  const handleClose = () => reset();

  if (!currentStep) return null;

  if (typeof currentStep === "function") {
    return (
      <ModalForm
        isOpen={open}
        onClose={handleClose}
        title={flow.title}
        customContent={currentStep({ setStep })}
      />
    );
  }

  return (
    <ModalForm
      isOpen={open}
      onClose={handleClose}
      title={flow.title}
      fields={currentStep.fields}
      submitText={currentStep.submitText}
      cancelText={currentStep.cancelText}
      onSubmit={handleSubmit}
      loading={loading}
      status={status}
    />
  );
}