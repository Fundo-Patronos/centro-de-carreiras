"use client";
import { useState } from "react";
import Layout from "@/components/Layout";

export default function Mentoria() {
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // This function will be triggered when the iframe is fully loaded
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Layout currentPage="mentores"> {/* Pass the currentPage prop */}
      {/* First Section */}
      <section className="relative w-full h-[400px] flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
          Precisa de orientação de carreira?
        </h1>
        <p className="mt-4 text-2xl text-gray-700">
          Agende uma reunião com um mentor da sua área de interesse
        </p>
      </section>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">

        {/* Display loading spinner while iframe is loading */}
        {isLoading && (
          <div className="flex items-center justify-center mt-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
          </div>
        )}

        {/* Iframe with onLoad event to stop the loading spinner */}
        <iframe
          src="https://airtable.com/embed/app4uSEqO2S03EO5X/shrOzONvjuqtxlN61?viewControls=on"
          frameBorder="0"
          width="100%"
          height="533"
          onLoad={handleIframeLoad} // Trigger when iframe finishes loading
          className={isLoading ? "hidden" : ""} // Hide iframe until it's loaded
        ></iframe>
      </div>
    </Layout>
  );
}
