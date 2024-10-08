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
    <Layout currentPage="vagas"> {/* Pass the currentPage prop */}
      {/* First Section with Background Image, Opacity Layer, and Rotation */}
      <section className="relative z-[-2] w-full flex flex-col justify-center items-center text-center bg-white bg-cover bg-center"
        style={{
          height: '300px', // Adjusted height for a more compact section
        }}>

        {/* Background Image */}
        <div
          className="absolute bg-cover bg-center"
          style={{
            backgroundImage: `url('https://framerusercontent.com/images/ogL1s0BXXsZDBTqCkSs3fKo4.png')`,
            transform: 'rotate(-5deg)', // Rotate the background image only
            backgroundSize: "cover",
            width: '170%',  // Increase the width slightly
            height: '170%', // Increase the height slightly
            top: '-20px',   // Adjust the position upwards a bit
            left: '-500px',  // Move the image more to the left
            zIndex: -1,     // Ensure it's behind the content
          }}
        ></div>


        {/* Layer with opacity for text readability */}
        <div className="absolute inset-0 bg-white opacity-70"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
            Seu próximo passo começa aqui
          </h1>
          <p className="mt-4 text-2xl text-gray-700">
            Explore vagas e oportunidades dos nossos parceiros
          </p>
        </div>
      </section>

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
          src="https://airtable.com/embed/appCNXz4iZl0J1gfG/shrgA1iPRv3nUcw1v?viewControls=on"
          frameBorder="0"
          width="100%"
          height="533"
          onLoad={handleIframeLoad} // Trigger when iframe finishes loading
          className={isLoading ? "hidden" : ""} // Hide iframe until it's loaded
        ></iframe>
      </div>
    </Layout >
  );
}
