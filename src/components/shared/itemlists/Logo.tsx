import React from 'react';

const AnimatedNameLogo = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 400 120" 
      className="aman-logo w-full h-10"
      aria-label="Aman"
    >
      <style jsx>{`
        .aman-logo {
          font-family: 'Arial', sans-serif;
          overflow: visible;
        }
        
        .letter-a {
          fill: none;
          stroke: #3b82f6;
          stroke-width: 2;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 1.5s ease-in-out forwards;
        }
        
        .letter-m {
          fill: none;
          stroke: #3b82f6;
          stroke-width: 2;
          stroke-dasharray: 250;
          stroke-dashoffset: 250;
          animation: draw 1.5s ease-in-out forwards 0.3s;
        }
        
        .letter-a2 {
          fill: none;
          stroke: #3b82f6;
          stroke-width: 2;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 1.5s ease-in-out forwards 0.6s;
        }
        
        .letter-n {
          fill: none;
          stroke: #3b82f6;
          stroke-width: 2;
          stroke-dasharray: 180;
          stroke-dashoffset: 180;
          animation: draw 1.5s ease-in-out forwards 0.9s;
        }
        
        .dot {
          fill: #ec4899;
          opacity: 0;
          transform-origin: center;
          animation: 
            fadeIn 0.5s ease-out forwards 1.8s,
            pulse 2s infinite ease-in-out 2.3s;
        }
        
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
      `}</style>
      
      {/* Letter A */}
      <path 
        className="letter-a" 
        d="M30,100 V40 L60,10 L90,40 V100 M60,40 V70"
      />
      
      {/* Letter M */}
      <path 
        className="letter-m" 
        d="M110,100 V40 L140,70 L170,40 V100"
      />
      
      {/* Letter A */}
      <path 
        className="letter-a2" 
        d="M190,100 V40 L220,10 L250,40 V100 M220,40 V70"
      />
      
      {/* Letter N */}
      <path 
        className="letter-n" 
        d="M270,100 V40 L310,100 M310,100 V40"
      />
      
      {/* Animated Dot */}
      <circle 
        className="dot" 
        cx="350" 
        cy="60" 
        r="10"
      />
    </svg>
  );
};

export default AnimatedNameLogo;