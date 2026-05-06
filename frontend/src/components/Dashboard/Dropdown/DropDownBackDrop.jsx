export default function DropDownBackdrop({ show, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[60] color-transition ${
        show
          ? "bg-black/60 backdrop-blur-md opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    />
  );
}