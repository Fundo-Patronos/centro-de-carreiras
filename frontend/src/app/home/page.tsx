// Homepage.tsx
'use client';
import { useEffect, useState } from "react";
import Testimonials from "../../components/Testimonials";
import Layout from "@/components/Layout";
import HeroSection from "@/components/Homepage/Hero";
import ExploreSection from "@/components/Homepage/ExploreSection";

export default function Home() {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage');
    const storedName = authData ? JSON.parse(authData).state.user.user_name : null;
    if (storedName) {
      const firstName = storedName.split(' ')[0];
      setName(firstName);
    }
  }, []);

  return (
    <Layout currentPage="home">
      <div className="min-h-screen flex flex-col bg-white relative">
        {/* Background image - now with lower z-index */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <img
            src="/images/identidade-visual/Ativo-9assets.svg"
            alt="Background pattern"
            className="absolute top-1/2 left-1/3 w-[600px] h-[350px] opacity-80"
            style={{
              transform: 'translate(-60%, -40%) rotate(35deg) scale(4.2)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Content container - higher z-index */}
        <div className="relative" style={{ zIndex: 0 }}>
          {/* Hero section - make sure its internal z-index doesn't interfere */}
          <div className="relative">
            <HeroSection userName={name || 'Visitante'} />
          </div>
          
          {/* Explore section */}
          <div className="relative ">
            <ExploreSection />
          </div>

          {/* Testimonials section */}
          <section className="relative px-4 py-12 md:py-16  bg-opacity-90">
            <div className="container mx-auto">
              <div className="mb-8 md:mb-12">
                <h2 className="flex items-center text-xl md:text-2xl font-bold text-gray-800">
                  <span className="hidden md:inline-block w-12 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 mr-4"></span>
                  O que dizem sobre nós
                </h2>
              </div>
              <Testimonials />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}