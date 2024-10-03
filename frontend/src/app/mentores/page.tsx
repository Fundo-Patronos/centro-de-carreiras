import Layout from "@/components/Layout";

export default function Mentoria() {
  return (
    <Layout currentPage="mentores"> {/* Pass the currentPage prop */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl text-black font-bold">Página de Mentoria</h1>
        <p className="text-lg text-black mt-4">Este é um Placeholder para a página de Mentoria.</p>
        <iframe
          src="https://airtable.com/embed/app4uSEqO2S03EO5X/shrOzONvjuqtxlN61?viewControls=on"
          frameBorder="0"
          width="100%"
          height="533"
        ></iframe>
      </div>
    </Layout>
  );
}
