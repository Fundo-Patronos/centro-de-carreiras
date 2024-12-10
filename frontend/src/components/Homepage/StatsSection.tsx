import React from "react";
interface Stat {
    value: string;
    label: string;
  }
  
  interface StatsSectionProps {
    stats?: Stat[];
  }
  
  const StatsSection: React.FC<StatsSectionProps> = ({ 
    stats = [
      { value: "50+", label: "Mentores disponíveis" },
      { value: "200+", label: "Mentorias realizadas" },
      { value: "30+", label: "Vagas exclusivas" }
    ] 
  }) => {
    return (
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-3xl md:text-4xl font-bold text-purple-600">{stat.value}</p>
                <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default StatsSection;
