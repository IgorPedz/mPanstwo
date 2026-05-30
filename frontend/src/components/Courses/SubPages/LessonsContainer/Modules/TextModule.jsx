export default function TextModule({ data }) {
  return (
    <div className="space-y-4 color-transition">
      {data.title && (
        <h2 className="text-2xl font-black color-transition">
          {data.title}
        </h2>
      )}

      <p className="leading-8 text-slate-700 dark:text-slate-300 color-transition">
        {data.text}
      </p>
    </div>
  );
}