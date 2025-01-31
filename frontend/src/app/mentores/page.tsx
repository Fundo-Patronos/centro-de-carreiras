import Layout from "@/components/Layout";
import Hero from "@/components/Mentores/Hero";

// Função para buscar a URL do iframe no servidor
export async function fetchIframeUrl() {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === "true";
  return isStaging
    ? "https://airtable.com/embed/app4uSEqO2S03EO5X/shrOzONvjuqtxlN61?"
    : "https://airtable.com/embed/app4uSEqO2S03EO5X/shr9ZDEboM5pT8Kpc?";
}

// Componente principal
export default async function Mentoria() {
  const iframeUrl = await fetchIframeUrl();

  return (
    <Layout currentPage="mentores">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center bg-white">
        <iframe
          src={iframeUrl}
          width="100%"
          height="650"
          className=""
        ></iframe>
      </div>
    </Layout>
  );
}
