export default function TextModule({ text }) {
  return (
    <div className="space-y-4 color-transition">

      <p className="leading-8 text-slate-700 dark:text-slate-300 color-transition">
        {text}
      </p>
    </div>
  );
}