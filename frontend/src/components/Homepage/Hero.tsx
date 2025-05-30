import Link from "next/link";
import GradientButton from "@/components/GradientButton";
import React from "react";

interface HeroSectionProps {
  userName: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ userName }) => {
  return (
    <section className="relative w-full h-[60vh] md:h-[50vh] flex items-center">
      <div className="relative z-10 w-full px-4 md:container md:mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mb-4 md:mb-6">
            Olá, {userName}!
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 md:mb-8">
            Descubra mentores experientes e oportunidades exclusivas para impulsionar sua carreira
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/mentores" className="w-full sm:w-auto">
            <GradientButton className="w-full text-center">
              Encontrar mentor
            </GradientButton>
          </Link>
          <Link 
            href="/vagas" 
            className="w-full sm:w-auto px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900/10 transition-colors text-center sm:text-sm md:text-md"
          >
            Ver oportunidades
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;