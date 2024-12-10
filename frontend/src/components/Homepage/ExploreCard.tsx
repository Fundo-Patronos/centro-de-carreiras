import Image from "next/image";
import Link from "next/link";
import GradientButton from "@/components/GradientButton";
import React from "react";

interface ExploreCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
  buttonText: string;
  href: string;
}

const ExploreCard: React.FC<ExploreCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  buttonText,
  href,
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="h-48 sm:h-64 relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
          {description}
        </p>
        <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm md:text-base text-gray-600">
              <svg className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={href} className="w-full">
          <GradientButton className="w-full text-center">
            {buttonText}
          </GradientButton>
        </Link>
      </div>
    </div>
  );
};

export default ExploreCard;
