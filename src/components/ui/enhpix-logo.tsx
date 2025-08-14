import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 50"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pixel grid structure as described */}
      
      {/* First lane: blue square, white square, blue square, blue triangle */}
      <rect x="0" y="0" width="10" height="10" fill="#5CB3F5" />
      <rect x="10" y="0" width="10" height="10" fill="white" />
      <rect x="20" y="0" width="10" height="10" fill="#5CB3F5" />
      <polygon points="30,0 40,0 35,10" fill="#5CB3F5" />
      
      {/* Second lane: white square, blue square, blue triangle */}
      <rect x="0" y="10" width="10" height="10" fill="white" />
      <rect x="10" y="10" width="10" height="10" fill="#5CB3F5" />
      <polygon points="20,10 30,10 25,20" fill="#5CB3F5" />
      
      {/* Third lane: blue square, blue square */}
      <rect x="0" y="20" width="10" height="10" fill="#5CB3F5" />
      <rect x="10" y="20" width="10" height="10" fill="#5CB3F5" />
      
      {/* Fourth lane: white square, blue square, blue triangle */}
      <rect x="0" y="30" width="10" height="10" fill="white" />
      <rect x="10" y="30" width="10" height="10" fill="#5CB3F5" />
      <polygon points="20,30 30,30 25,40" fill="#5CB3F5" />
      
      {/* Fifth lane: white square, white square, blue square */}
      <rect x="0" y="40" width="10" height="10" fill="white" />
      <rect x="10" y="40" width="10" height="10" fill="white" />
      <rect x="20" y="40" width="10" height="10" fill="#5CB3F5" />
      
      {/* Diamond on the right - blue edges, white inside */}
      <path
        d="M 60 0 
           L 80 25 
           L 60 50 
           L 40 25 
           Z"
        stroke="#5CB3F5"
        strokeWidth="4"
        fill="white"
      />
    </svg>
  );
};