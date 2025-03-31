"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Vagas/Hero";
import LazyLoadingCardFrame from "@/components/LazyLoadingCardFrame"
import axios from "axios";

interface Opportunity {
  id: string
}

export default function Vagas() {
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [opportunities, setOpportunities] = useState<Array<Opportunity>>([]);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const [isLoadingOpportunities, setIsLoadingOpportunities] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApiUrl = async () => {
      try {
        const response = await axios.get("/api");
        const url = response.data.apiUrl;
        setApiUrl(url);
      } catch (error) {
        setErrorOccurred(true);
        setIsLoading(false);
        console.error("Failed to fetch API URL:", error);
      }
    };

    fetchApiUrl();
  }, []);

  useEffect(() => {
    if (!apiUrl) return;

    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(apiUrl + "/opportunities");
        console.log(response.data);
        setOpportunities(response.data);
      } catch (error) {
        setErrorOccurred(true);
        setIsLoading(false);
        console.error("Failed to fetch opportunities:", error);
      } finally {
        setIsLoadingOpportunities(false);
      }
    };

    fetchOpportunities();
  }, [apiUrl]);

  useEffect(() => {
    if (!isLoadingIframe && !isLoadingOpportunities) {
      setIsLoading(false);
    }
  }, [isLoadingIframe, isLoadingOpportunities]);

  const iframeUrl =
    process.env.NEXT_PUBLIC_STAGING === "true"
      ? "https://airtable.com/embed/app4uSEqO2S03EO5X/shr7wJKJ7gzgd0K72?viewControls=on"
      : "https://airtable.com/embed/app4uSEqO2S03EO5X/shrNy5EvFgy1ZooZj?viewControls=on";

  return (
    <Layout currentPage="vagas">
      <Hero />
      <div className="flex flex-col items-center justify-center bg-gray-50 px-4 md:px-8 lg:px-[350px]">
        {errorOccurred && (
          <div className="flex flex-col items-center justify-center mt-8 mb-8 p-6 bg-red-50 border border-red-200 rounded-lg text-center max-w-md">
            <svg
              className="w-12 h-12 text-red-500 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              Algo deu errado
            </h3>
            <p className="text-gray-600">
              Não conseguimos carregar as vagas no momento. Por favor, tente
              novamente mais tarde ou entre em contato com o suporte se o
              problema persistir.
            </p>
          </div>
        )}

        {!errorOccurred && !isLoading && opportunities.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-8 mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center max-w-md">
            <svg
              className="w-12 h-12 text-blue-500 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Em breve!
            </h3>
            <p className="text-gray-600">
              Estamos preparando vagas exclusivas para você. Volte em breve
              para conferir as novidades!
            </p>
          </div>
        )}

        <LazyLoadingCardFrame
          loadingMessage="Carregando oportunidades exclusivas..."
          isFrameVisible={
            !errorOccurred && !isLoading && opportunities.length !== 0
          }
          isLoading={isLoading}
          iframeUrl={iframeUrl}
          setIsLoading={setIsLoadingIframe}
        />
      </div>
    </Layout>
  );
}
