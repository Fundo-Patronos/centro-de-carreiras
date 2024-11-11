'use client';

import { useEffect, useState } from "react";
import Testimonials from "../../components/Testimonials";
import Layout from "@/components/Layout";
import HeroSection from "@/components/Homepage/Hero";
import StatsSection from "@/components/Homepage/StatsSection";
import ExploreSection from "@/components/Homepage/ExploreSection";

export default function Home() {
  const [name, setName] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
      <div className="min-h-screen flex flex-col">
        <HeroSection userName={name || 'Visitante'} />
        <ExploreSection />
        
        <section className="px-4 py-12 md:py-16 bg-white">
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
    </Layout>
  );
}