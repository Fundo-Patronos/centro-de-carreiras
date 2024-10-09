import Layout from "@/components/Layout";
import { Button } from "@/components/Button";
import Image from "next/image";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <Layout currentPage="home"> 
    <div className="min-h-screen flex flex-col">

      {/* First Section with Background Image*/}
      <section className="relative w-full h-[600px]">
        <Image
          src="/images/campus.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full z-[-1]"
        />
        {/* Adding the darkening overlay*/}
        <div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-black max-w-[70%] md:max-w-[50%]">
            Centro de Carreiras Patronos
          </h1>
          <p className="mt-4 text-lg max-w-[70%] md:max-w-[50%]">
            Alavanque sua carreira com mentorias de ex-alunos da Universidade
            Estadual de Campinas
          </p>
          <div className="mt-8 space-x-4">
            <Button href="/mentores" className="bg-red-600 hover:bg-red-700">
              Visualizar mentores
            </Button>
            <Button
              href="/saber-mais"
              className="bg-gray-600 hover:bg-gray-700"
            >
              Saber mais
            </Button>
          </div>
        </div>
      </section>

      {/* Second Section - About */}
      <section className="flex flex-col md:flex-row justify-between items-center px-32 py-16 bg-white">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="flex items-center text-lg text-black font-light text-left mb-8 sm:text-xl -mx-10">
            <span className="inline-block w-12 h-0.5 bg-black mr-2 "></span>
            Sobre o centro de carreiras
          </h2>
          <h2 className="text-3xl text-black font-semibold mb-4">
            Um espaço para se conectar e participar de mentorias com ex-alunos
            da Universidade Estadual de Campinas
          </h2>
          <p className="text-gray-600 mb-4 max-w-[90%] md:max-w-[80%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            cursus, mi quis viverra ornare, eros dolor interdum nulla.
            <br /> <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
            quod beatae, odit dignissimos repellendus officiis animi modi minima
            dolores quo cupiditate rem voluptatem maxime a hic laudantium
            nostrum? Deserunt, velit.
          </p>
          <div className="mt-4 space-x-4">
            <Button href="/mentores" className="bg-red-600 hover:bg-red-700">
              Visualizar mentores
            </Button>
          </div>
        </div>
        <Image
          src="/images/mentoria.jpeg"
          alt="Mentoria"
          width={500}
          height={300}
          className="rounded-lg"
        />
      </section>

      {/* Third section - Mission */}
      <section className="px-32 py-16 bg-white">
        {/* Header */}
        <div className="mb-8">
          <h2 className="flex items-center text-lg text-black font-light text-left sm:text-xl">
            <span className="inline-block w-12 h-0.5 bg-black mr-2"></span>
            Nossa missão
          </h2>
        </div>

        {/* Card Container */}
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Card 1 */}
          <div className="max-w-sm bg-white p-4 rounded-lg shadow-md">
            <Image
              src="/images/impulsionando_sua_carreira.jpg"
              alt="Impulsionar sua carreira"
              width={400}
              height={200}
              className="rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-black">
              Impulsionar sua carreira
            </h3>
            <p className="text-gray-600 mt-2">
              Entre em contato com mentores selecionados de diversas empresas.
            </p>
            <Button
              href="/mentores"
              className="bg-red-600 hover:bg-red-700 mt-4"
            >
              Mentores
            </Button>
          </div>

          {/* Card 2 */}
          <div className="max-w-sm bg-white p-4 rounded-lg shadow-md">
            <Image
              src="/images/te_conectar_ao_mercado.jpg"
              alt="Te conectar ao mercado"
              width={400}
              height={200}
              className="rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-4 text-black">
              Te conectar ao mercado
            </h3>
            <p className="text-gray-600 mt-2">
              Tenha acesso a vagas selecionadas pelos mentores presentes no
              centro de carreiras.
            </p>
            <Button href="/vagas" className="bg-red-600 hover:bg-red-700 mt-4">
              Vagas selecionadas
            </Button>
          </div>
        </div>
      </section>

      {/* 4th section - testimony */}
      <section className="relative w-full h-[400px] bg-gray-900">
        <Image
          src="/images/testimonial-background.jpeg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full z-[-1]"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <blockquote className="text-2xl font-semibold max-w-2xl">
            &quot;Este aplicativo mudou minha vida! Agora eu consigo agendar
            mentorias facilmente e aprender com os melhores.&quot;
          </blockquote>
          <cite className="mt-4">— Usuário do Centro de Carreiras</cite>
        </div>
      </section>
    </div>
    </Layout>
  );
}
