import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[50vh] flex items-center overflow-hidden bg-white">
      {/* Text Content */}
      <div className="relative z-10 px-4 mx-auto">
        <h1 className="text-3xl text-center sm:text-4xl md:text-6xl mb-4 md:mb-6 font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
          Precisa de orientação de carreira?
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-900 text-center">
          Agende uma reunião com um mentor da sua área de interesse
        </p>
      </div>
    </section>
  );
};

export default HeroSection;