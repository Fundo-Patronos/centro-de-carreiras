// Homepage.tsx
'use client';
import { useEffect, useState } from "react";
import Testimonials from "../../components/Testimonials";
import Layout from "@/components/Layout";
import HeroSection from "@/components/Homepage/Hero";
import ExploreSection from "@/components/Homepage/ExploreSection";
import { useAuthStore } from '../../store/authStore';
import BackgroundPattern from "@/components/Homepage/BackgroundPattern"

export default function Home() {
  const [name, setName] = useState<string>('');

  const username = useAuthStore((state) => state.username);

    useEffect(() => {
      if (username) {
        const firstName = username.split(' ')[0];
        setName(firstName);
      }
    }, [username]);

  return (
    <Layout currentPage="home">
      <div className="min-h-screen flex flex-col bg-white relative" >
        <BackgroundPattern/>
        <div className="relative" style={{ zIndex: 10 }}>
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
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-800">
                  <span 
                    className="inline-block h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 
                              w-6 md:w-12 
                              transform origin-left scale-x-100"
                   />
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
