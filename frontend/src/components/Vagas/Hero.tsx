const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[55vh] md:h-[45vh] flex items-center pb-8 overflow-hidden bg-white bg-gradient-to-r from-[#C964E2]/30 via-[#FF6666]/20 to-[#FF9700]/30 shadow-md">
      {/* Text Content */}
      <div className="relative z-10 px-4 mx-auto">
        <h1 className="text-2xl text-center sm:text-3xl md:text-5xl mb-4 md:mb-6 font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
          Seu próximo passo começa aqui
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-900 text-center">
          Oportunidades exclusivas para você, que vive a excelência da Unicamp
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
