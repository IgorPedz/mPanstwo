import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function ImageSlider({
  slides = [],
  autoPlay = true,
  interval = 5000,
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const activeSlide = slides[current];

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeSlide.img}
            alt={activeSlide.title}
            className="w-full h-full object-cover grayscale-[30%] contrast-[110%]"
          />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm2 2h1v1H2V2z' fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
            }}
          ></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 left-12 z-40 max-w-sm pointer-events-none">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/90 backdrop-blur text-white p-6 border-2 border-indigo-500 shadow-[8px_8px_0px_0px_rgba(99,102,241,1)]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black uppercase tracking-tighter">
              {activeSlide.title}
            </h3>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
          </div>

          <p className="text-[11px] font-medium leading-relaxed opacity-70 border-t border-white/10 pt-3">
            {activeSlide.desc}
          </p>

          <div className="mt-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-4 h-1 bg-indigo-500"
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 z-30 flex items-center">
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="cursor-pointer p-5 bg-slate-900 text-white border-2 border-r-0 border-white hover:bg-indigo-600 transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="bg-white px-6 py-5 border-2 border-white min-w-[90px] flex justify-center italic">
          <span className="text-slate-900 font-black font-mono text-xl">
            0{current + 1}
          </span>
        </div>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="cursor-pointer p-5 bg-slate-900 text-white border-2 border-l-0 border-white hover:bg-indigo-600 transition-colors"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
        <motion.div
          key={current}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: interval / 1000, ease: "linear" }}
          className="h-full bg-indigo-500"
        />
      </div>
    </div>
  );
}
