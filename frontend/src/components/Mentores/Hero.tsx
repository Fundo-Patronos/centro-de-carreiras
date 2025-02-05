import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[50vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="relative block w-full h-full md:hidden">
          <Image
            src="/images/entrada-unicamp-mobile.png"
            alt="Background Image for Mobile"
            sizes="100%"
            fill
            style={{
              objectFit: "cover",
            }}
            priority={true}
            className="filter blur-[4px]"
          />
        </div>
        {/* Desktop Image */}
        <div className="relative w-full h-full hidden md:block">
          <Image
            src="/images/entrada-unicamp.png"
            alt="Background Image for Desktop"
            sizes="100%"
            fill
            style={{
              objectFit: "cover",
            }}
            priority={true}
            className="filter blur-[4px]"
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 px-4 mx-auto">
        <h1 className="text-3xl text-center sm:text-4xl md:text-6xl mb-4 md:mb-6 font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
          Precisa de orientação de carreira?
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white text-center">
          Agende uma reunião com um mentor da sua área de interesse
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
