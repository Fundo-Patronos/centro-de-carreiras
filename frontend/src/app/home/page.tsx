'use client';

import Testimonials from "../../components/Testimonials";
import GradientButton from "@/components/GradientButton";
import Layout from "@/components/Layout";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";

export default function Home() {

  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  });

  return (
    <Layout currentPage="home">
      <div className="min-h-screen flex flex-col">
        {/* First Section with Background Image */}
        <section className="relative w-full h-[30vh]">
          <Image
            src="/images/campus.jpg"
            alt="Background Image"
            fill
            style={{ objectFit: "cover" }}
            priority={true}
            className="absolute inset-0 z-[-1] blur-sm"
          />
          {/* Darkening overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div>

          <div className="relative z-10 flex w flex-col items-center justify-center h-full text-center text-white px-4">
            <h1 className="text-6xl font-black max-w-[90%] md:max-w-[50%]">
              Olá, Bruno!
            </h1>
          </div>
        </section>

        <section id="explore" className="px-8 py-16">
          <div className="mb-8">
              <h2 className="flex items-center text-lg text-black font-light text-left sm:text-xl">
                <span className="inline-block w-12 h-0.5 bg-black mr-2"></span>
                Explore
              </h2>
          </div>

          {/* Container dos Cartões */}
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Cartão de Mentorias */}
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden max-w-4xl">
              <div className="md:w-1/2">
                <Image
                  src="/images/impulsionando_sua_carreira.jpg"
                  alt="Mentorias"
                  width={600}
                  height={400}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-between">
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-black">Mentorias</h3>
                  <p className="text-gray-700 mt-4">
                    Aprenda com quem já trilhou o caminho que você deseja seguir.
                  </p>
                  <ul className="text-gray-600 mt-4 list-disc list-inside">
                    <li>Acesse mentores experientes em diversas áreas.</li>
                    <li>Receba orientações individualizadas sobre carreira.</li>
                    <li>Agende sessões de mentoria conforme sua disponibilidade.</li>
                  </ul>
                </div>
                <GradientButton
                  onClick={() => router.push('/mentores')}
                >
                  Conheça nossos mentores
                </GradientButton>
              </div>
            </div>

            {/* Cartão de Vagas */}
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden max-w-4xl">
              <div className="md:w-1/2">
                <Image
                  src="/images/te_conectar_ao_mercado.jpg"
                  alt="Vagas"
                  width={600}
                  height={400}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-between">
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-black">Vagas</h3>
                  <p className="text-gray-700 mt-4">
                    Exclusivas para você, que vive o desafio e a excelência da Unicamp.
                  </p>
                  <ul className="text-gray-600 mt-4 list-disc list-inside">
                    <li>Um canal de aplicações exclusivo para alunos da Unicamp.</li>
                    <li>Conecte-se diretamente empresas parceiras em diversas áreas.</li>
                    <li>Explore oportunidades de parceiros do Patronos</li>
                  </ul>
                </div>
                <GradientButton
                  onClick={() => router.push('/mentores')}
                >
                  Confira as vagas disponíveis
                </GradientButton>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8">
          <div className="mb-8">
            <h2 className="flex items-center text-lg text-black font-light text-left sm:text-xl">
              <span className="inline-block w-12 h-0.5 bg-black mr-2"></span>
              Depoimentos
            </h2>
          </div>
          <Testimonials />
        </section>


      </div>
    </Layout>
  );
}
