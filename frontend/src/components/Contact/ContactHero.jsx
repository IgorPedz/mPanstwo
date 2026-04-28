import heroImage from "../../../public/images/heroImageContact.jpg";

export default function ContactHero() {
 return (
    <div className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden mb-30">
      <img
        src={heroImage}
        alt="Kontakt hero"
        className="absolute w-full h-full object-cover scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>

      <div className="relative text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
          Skontaktuj się z nami
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
          Masz pytania? Napisz lub zadzwoń — chętnie pomożemy
        </p>
      </div>
    </div>
  );
}