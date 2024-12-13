"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Mentores/Hero";

export default function Mentoria() {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Layout currentPage="mentores">
      {/* Hero Section */}
      <Hero/>

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
