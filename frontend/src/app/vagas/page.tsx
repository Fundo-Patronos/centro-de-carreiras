"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Vagas/Hero";

export default function Mentoria() {
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // This function will be triggered when the iframe is fully loaded
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Layout currentPage="vagas">
      <Hero /> {/* Hero Section */}
      {/* Main Content */}
      <div className=" flex flex-col items-center justify-center bg-white">
        {/* Display loading spinner while iframe is loading */}
        {isLoading && (
          <div className="flex items-center justify-center mt-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
          </div>
        )}

        {/* Iframe with onLoad event to stop the loading spinner */}
        <iframe
          src="https://airtable.com/embed/app4uSEqO2S03EO5X/shr7wJKJ7gzgd0K72?viewControls=on"
          width="100%"
          height="533"
          onLoad={handleIframeLoad} // Trigger when iframe finishes loading
          className={isLoading ? "hidden" : ""} // Hide iframe until it's loaded
        ></iframe>
      </div>
    </Layout>
  );
}
