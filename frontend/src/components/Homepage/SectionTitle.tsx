import React from 'react';

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-8 md:mb-12">
      <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-800">
        <span 
          className="inline-block h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 
                     w-6 md:w-12 
                     transform origin-left scale-x-100"
        />
        {children}
      </h2>
    </div>
  );
};

export default SectionTitle;