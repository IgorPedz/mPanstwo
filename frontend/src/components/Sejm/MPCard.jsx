import { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../../lib/apiConfig";
import { CLUB_HEX } from "./Hemicycle";

export default function MPCard({ mp, onClick, priority, onHover }) {
  const [imgOk, setImgOk] = useState(true);
  const initials = (mp.firstLastName ?? "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const clubColor = CLUB_HEX[mp.club] ?? "#94a3b8";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      onMouseEnter={onHover}
      className="group cursor-pointer rounded-2xl overflow-hidden border
        border-slate-200/70 dark:border-slate-800/60
        bg-white dark:bg-slate-900
        hover:border-slate-300 dark:hover:border-slate-700
        hover:shadow-lg transition-all color-transition"
    >
      <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden color-transition">
        {imgOk ? (
          <img
            src={`${API_BASE}/sejm/mp/${mp.id}/photo`}
            alt={mp.firstLastName}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover object-top transition-transform duration-400 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl font-black text-slate-300 dark:text-slate-600 select-none">
              {initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute top-2 left-2">
          <span
            className="text-[8px] font-black px-1.5 py-0.5 rounded-md text-white"
            style={{ background: clubColor }}
          >
            {mp.club}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="font-black text-[11px] leading-tight text-white">{mp.firstLastName}</p>
          <p className="text-[9px] text-white/55 mt-0.5 leading-tight">{mp.districtName}</p>
        </div>
      </div>
    </motion.div>
  );
}
