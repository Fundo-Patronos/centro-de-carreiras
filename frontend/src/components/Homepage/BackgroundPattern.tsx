import React from 'react';

const BackgroundPattern = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/3 w-[800px] h-[500px] transform-gpu"
          style={{
            width: '800px',
            height: '500px',
            transform: 'translate(-65%, -80%) rotate(60deg) scale(1.3)',
            opacity: 0.8,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 350 350"
            preserveAspectRatio="xMidYMid meet"
          >
            <use href="/images/identidade-visual/Ativo-9assets.svg#svgContent" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -left-72 overflow-hidden pointer-events-none">
      <div
        className="absolute top-1/3 -left-3/4 w-[500px] h-[750px] transform-gpu"
        style={{
          width: '1500px',
          height: '450px',
          transform: 'rotate(35deg) scale(4.8)',
          opacity: 0.8,
        }}
      >
        <svg
          width="150%"
          height="100%"
          viewBox="500 0 2360 1920"
          preserveAspectRatio="xMidYMid meet"
        >
          <use href="/images/identidade-visual/Ativo-9assets.svg#svgContent" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundPattern;