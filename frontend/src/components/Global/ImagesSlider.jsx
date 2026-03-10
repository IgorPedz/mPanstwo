import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function ImageSlider({ images = [], autoPlay = true, interval = 5000 }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length, current]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden">

      {prev !== null && (
        <motion.img
          key={prev}
          src={images[prev]}
          alt={`slide-${prev}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      )}

      <motion.img
        key={current}
        src={images[current]}
        alt={`slide-${current}`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-white/10 to-transparent"></div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => {
              setPrev(current);
              setCurrent((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2  p-3 rounded-full shadow-lg transition bg-gray-100 hover:bg-gray-300"
          >
            <ChevronLeftIcon className="w-6 h-6 text-indigo-700" />
          </button>

          <button
            onClick={() => {
              setPrev(current);
              setCurrent((prev) => (prev + 1) % images.length);
            }}
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2  p-3 rounded-full shadow-lg transition bg-gray-100 hover:bg-gray-300"
          >
            <ChevronRightIcon className="w-6 h-6 text-indigo-700" />
          </button>
        </>
      )}
    </div>
  );
}