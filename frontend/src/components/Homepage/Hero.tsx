import Image from "next/image";
import Link from "next/link";
import GradientButton from "@/components/GradientButton";
import React from "react";

interface HeroSectionProps {
  userName: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ userName }) => {
  return (
    <section className="relative w-full h-[60vh] md:h-[50vh] flex items-center">
      <Image
        src="/images/campus.jpg"
        alt="Background Image"
        fill
        style={{ objectFit: "cover" }}
        priority={true}
        className="absolute inset-0 z-[-1] filter blur-[3px]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50 z-[-1]"></div>

      <div className="relative z-10 w-full px-4 md:container md:mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6">
            Olá, {userName}!
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-6 md:mb-8">
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
              className="w-full sm:w-auto px-4 py-2 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-center"
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
