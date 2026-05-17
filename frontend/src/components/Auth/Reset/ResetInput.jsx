export default function ResetInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="text-[11px] font-black tracking-[0.2em] uppercase text-slate-500">
        {label}
      </label>

      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          mt-2 w-full px-5 py-4
          rounded-2xl
          bg-slate-50 dark:bg-slate-800/60
          border border-slate-200 dark:border-slate-700
          text-slate-900 dark:text-white
          outline-none
          transition-all duration-300
          focus:border-indigo-500
          focus:ring-4 focus:ring-indigo-500/10
        "
      />
    </div>
  );
}