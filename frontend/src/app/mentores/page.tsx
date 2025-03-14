import Layout from "@/components/Layout";
import Hero from "@/components/Mentores/Hero";

export default async function Mentoria() {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === "true";
  const iframeUrl = isStaging
    ? "https://airtable.com/embed/app4uSEqO2S03EO5X/shrOzONvjuqtxlN61?viewControls=on"
    : "https://airtable.com/embed/app4uSEqO2S03EO5X/shr9ZDEboM5pT8Kpc?viewControls=on";

  return (
    <Layout currentPage="mentores">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center bg-gray-50 px-4 md:px-8 lg:px-[350px]">
        <iframe
          src={iframeUrl}
          width="100%"
          height="650"
          className="shadow-lg rounded-lg"
        ></iframe>
      </div>
    </Layout>
  );
}