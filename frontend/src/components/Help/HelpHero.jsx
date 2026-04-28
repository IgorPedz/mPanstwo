import heroImage from "../../../public/images/heroImageContact.jpg";

export default function HelpHero() {
  return (
    <div className="relative w-full h-80 md:h-[420px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="FAQ hero"
        className="absolute w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white">FAQ</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
          Najczęściej zadawane pytania dotyczące naszej platformy
        </p>
      </div>
    </div>
  );
}