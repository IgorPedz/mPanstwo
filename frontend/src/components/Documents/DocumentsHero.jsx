import heroImage from "../../../public/images/heroImageContact.jpg";

export default function DocumentsHero() {
  return (
    <div className="relative w-full h-80 md:h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Documents hero"
        className="absolute w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative text-center px-6 md:px-0">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Dokumenty i regulaminy
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Wszystkie ważne dokumenty dotyczące naszej platformy w jednym miejscu
        </p>
      </div>
    </div>
  );
}