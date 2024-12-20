import ExploreCard from "./ExploreCard";
import React from "react";
import SectionTitle from "./SectionTitle";

interface ExploreSectionInterface {
  sectionTitle?: string;
}

const ExploreSection: React.FC<ExploreSectionInterface> = ({ 
  sectionTitle = "Explore novas oportunidades" 
}) => {
  const exploreCards = [
    {
      title: "Mentorias",
      description: "Aprenda com quem já trilhou o caminho que você deseja seguir.",
      imageSrc: "/images/alternativaHome1.jpg",
      imageAlt: "Mentorias",
      features: [
        "Acesse mentores experientes em diversas áreas",
        "Receba orientações individualizadas",
        "Agende sessões conforme sua disponibilidade"
      ],
      buttonText: "Conheça nossos mentores",
      href: "/mentores"
    },
    {
      title: "Vagas Exclusivas",
      description: "Exclusivas para você, que vive o desafio e a excelência da Unicamp.",
      imageSrc: "/images/alternativaHome2.jpg",
      imageAlt: "Vagas",
      features: [
        "Canal exclusivo para alunos da Unicamp",
        "Conexão direta com empresas parceiras",
        "Oportunidades selecionadas dos parceiros Patronos"
      ],
      buttonText: "Confira as vagas disponíveis",
      href: "/vagas"
    }
  ];

  return (
    <section id="explore" className="px-4 py-12 md:py-16">
      <div className="container mx-auto">
        <SectionTitle>{sectionTitle}</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {exploreCards.map((card, index) => (
            <ExploreCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
