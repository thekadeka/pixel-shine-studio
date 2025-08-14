import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left side - stepped cross matching your exact design */}
      <path
        d="M 10 10 
           L 40 10 
           L 40 25 
           L 55 25 
           L 55 40 
           L 70 40 
           L 70 55 
           L 55 55 
           L 55 70 
           L 40 70 
           L 40 85 
           L 25 85 
           L 25 70 
           L 10 70 
           L 10 55 
           L 25 55 
           L 25 40 
           L 10 40 
           Z"
        fill="#5CB3F5"
      />
      
      {/* Right side - rotated diamond with hollow center */}
      <path
        d="M 130 20 
           L 170 60 
           L 130 100 
           L 90 60 
           Z"
        fill="#5CB3F5"
      />
      
      {/* White hollow center of diamond */}
      <path
        d="M 130 35 
           L 155 60 
           L 130 85 
           L 105 60 
           Z"
        fill="white"
      />
    </svg>
  );
};