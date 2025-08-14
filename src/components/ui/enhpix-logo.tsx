import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 80 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Thick blocky cross - matching your exact logo design */}
      <rect x="8" y="12" width="16" height="8" fill="#5CB3F5" />
      <rect x="14" y="6" width="4" height="20" fill="#5CB3F5" />
      
      {/* Diamond outline - hollow center as in your logo */}
      <path
        d="M 48 8 
           L 56 16 
           L 48 24 
           L 40 16 
           Z"
        stroke="#5CB3F5"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
};