"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Vagas/Hero";

export default function Mentoria() {
  const [isLoading, setIsLoading] = useState(true); 

  const iframeUrl =
    process.env.NEXT_PUBLIC_STAGING === "true"
      ? "https://airtable.com/embed/app4uSEqO2S03EO5X/shr7wJKJ7gzgd0K72?viewControls=on"
      : "https://airtable.com/embed/app4uSEqO2S03EO5X/shrNy5EvFgy1ZooZj?viewControls=on";

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Layout currentPage="vagas">
      <Hero /> {/* Hero Section */}
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center bg-gray-50 px-4 md:px-8 lg:px-[350px]">
        {/* Display loading spinner while iframe is loading */}
        {isLoading && (
          <div className="flex items-center justify-center mt-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
          </div>
        )}
        <iframe
          src={iframeUrl}
          width="100%"
          height="650"
          onLoad={handleIframeLoad}
          className="shadow-lg rounded-lg"
        ></iframe>
      </div>
    </Layout>
  );
}
