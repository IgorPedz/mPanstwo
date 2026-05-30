export default function InfoModule({ data }) {
  return (
    <div className="border-l-4 border-blue-500 bg-red-50 dark:bg-blue-950/20 p-5 rounded-r-xl color-transition">
      <h3 className="font-black text-blue-600 dark:text-blue-400 mb-2 color-transition">
        {data.title}
      </h3>

      <p className="text-slate-700 dark:text-slate-300 color-transition">
        {data.text}
      </p>
    </div>
  );
}