import React from 'react';

const BackgroundPattern = () => {
  const [screenSize, setScreenSize] = React.useState(0); // Start with 0, update later

  React.useEffect(() => {
    if (typeof window !== "undefined") { // Ensure window is defined
      setScreenSize(window.innerWidth);

      const updateSize = () => setScreenSize(window.innerWidth);
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  const isMobile = screenSize < 768;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute transform-gpu"
        style={{
          width: isMobile ? '120vw' : '100vw',
          height: isMobile ? '100vh' : '90vh',
          top: isMobile ? '59%' : '30%',
          left: isMobile ? '-25%' : '40%',
          transform: isMobile 
            ? 'translate(-50%, -50%) rotate(40deg) scale(1.7)' 
            : 'translate(-49%, 100%) rotate(38deg) scale(1.9)',
          opacity: 0.8,
        }}
      >
        <svg
          width="85%"
          height="160%"
          viewBox={isMobile ? "0 0 350 350" : "500 0 2360 1920"}
          preserveAspectRatio="xMidYMid slice"
        >
          <use href="/images/identidade-visual/Ativo-9assets.svg#svgContent" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundPattern;