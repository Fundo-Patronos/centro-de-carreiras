"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

export default function Mentoria() {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Layout currentPage="mentores">
      {/* Hero Section */}
      <section
        className="relative w-full flex flex-col justify-center items-center text-center bg-white overflow-hidden"
        style={{
          height: "30vh",
        }}
      >
        {/* Background Image Container */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 w-[170%] h-[170%] bg-cover bg-center origin-center"
            style={{
              backgroundImage: "url('/images/background-mentors-opportunities.png')",
              transform: "translate(-50%, -50%) rotate(-5deg)",
            }}
          ></div>
        </div>

        {/* Opacity Layer */}
        <div className="absolute inset-0 bg-white opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
            Precisa de orientação de carreira?
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-700">
            Agende uma reunião com um mentor da sua área de interesse
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center bg-white">
        {isLoading && (
          <div className="flex items-center justify-center mt-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
          </div>
        )}
        <iframe
          src="https://airtable.com/embed/app4uSEqO2S03EO5X/shrOzONvjuqtxlN61?viewControls=on"
          width="100%"
          height="650"
          onLoad={handleIframeLoad}
          className={isLoading ? "hidden" : ""}
        ></iframe>
      </div>
    </Layout>
  );
}