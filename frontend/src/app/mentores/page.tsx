"use client";

import Layout from "@/components/Layout";
import Hero from "@/components/Mentores/Hero";
import LazyLoadingIframe from "@/components/LazyLoadingIFrame";
import { useState } from "react";

export default function Mentoria() {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === "true";
  const [isLoading, setIsLoading] = useState(true);
  const iframeUrl = isStaging
    ? "https://airtable.com/embed/app4uSEqO2S03EO5X/shrOzONvjuqtxlN61?viewControls=on"
    : "https://airtable.com/embed/app4uSEqO2S03EO5X/shr9ZDEboM5pT8Kpc?viewControls=on";

  return (
    <Layout currentPage="mentores">
      <Hero />

      <div className="flex flex-col items-center justify-center bg-gray-50 px-4 md:px-8 lg:px-[350px]">
        <LazyLoadingIframe
          loadingMessage="Buscando mentores disponíveis..."
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          iframeUrl={iframeUrl}
          isFrameVisible={!isLoading}
        />
      </div>
    </Layout>
  );
}
