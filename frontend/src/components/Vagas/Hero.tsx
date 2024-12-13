import Image from "next/image";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[50vh] flex items-center">
      <Image
        src="/images/praca-cb.jpeg"
        alt="Background Image"
        fill
        style={{ objectFit: "cover" }}
        priority={true}
        className="absolute inset-0 z-[-1] filter blur-[4px]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50 z-[-1]"></div>

      <div className="relative z-10 px-4 mx-auto">
        <h1 className="text-3xl text-center sm:text-4xl md:text-6xl mb-4 md:mb-6 font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
          Seu próximo passo começa aqui
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white text-center">
          Oportunidades exclusivas para você, que vive a excelência da Unicamp
        </p>
      </div>

    </section>
  );
};

export default HeroSection;