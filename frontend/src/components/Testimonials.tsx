import Image from "next/image";
import React from "react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  course?: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Como ex-aluno, sei o quão difícil pode ser encontrar um caminho para trilhar e, como mentor, espero ajudar os alunos a encontrarem o seu.",
    name: "Gustavo Beltrami",
    title: "CEO DeX",
    course: "Engenharia Mecânica 012",
    image: "/images/profile.png"
  },
  {
    quote: "Como Diretor de Projetos do Patronos, espero que o Centro de Carreiras fortaleça ainda mais a comunidade da Unicamp, estimulando o networking entre alunos e profissionais experientes, além de aproximar talentos da Unicamp com oportunidades do mercado de trabalho.",
    name: "Matheus Pires",
    title: "Diretor de Projetos, Patronos",
    course: "Engenharia Mecânica 015",
    image: "/images/profile.png",
  },
  {
    quote: "Como recrutador, sei o potencial dos alunos da Unicamp e espero, pelo canal de aplicação de vagas exclusivo do Centro de Carreiras, poder ajudá-los a encontrarem posições mercado de trabalho.",
    name: "Fulano de tal",
    title: "Recrutador, Empresa X",
    image: "/images/profile.png"
  },
  {
    quote: "Nossa visão para o Centro de Carreiras é que ele seja aquilo que eu gostaria de ter tido enquanto calouro: um espaço para melhor desenvolver o meu caminho.",
    name: "Bruno Freitas",
    title: "Desenvolvedor",
    course: "Engenharia de Computação 021",
    image: "/images/profile.png"
  },
];

const Testimonials: React.FC = () => {
  return (
    <section
      className="my-5 bg-cover bg-center bg-no-repeat py-16 rounded-lg shadow-md"
      style={{ backgroundImage: "url('/images/identidade-visual/Ativo-9assets.svg')" }} // Coloque o caminho da sua imagem de fundo aqui
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-md p-6 ${
              (index === 1 || index === 2) ? "md:col-span-2" : ""
            }`}
          >
            <p className="text-gray-700 text-lg mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-900 text-sm">{testimonial.title}</p>
                <p className="text-gray-500 text-sm">{testimonial.course}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
