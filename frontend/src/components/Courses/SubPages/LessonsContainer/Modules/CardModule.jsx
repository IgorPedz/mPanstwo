export default function CardModule({ data }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg color-transition">
      <h3 className="text-xl font-black mb-2 color-transition">
        {data.title}
      </h3>

      <p className="text-white/80 color-transition">
        {data.text}
      </p>
    </div>
  );
}