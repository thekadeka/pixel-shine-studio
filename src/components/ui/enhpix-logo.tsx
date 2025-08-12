import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cross shape with stepped edges - exactly like the image */}
      <path
        d="M20 20 L30 20 L30 10 L50 10 L50 20 L60 20 L60 30 L70 30 L70 40 L60 40 L60 50 L70 50 L70 60 L60 60 L60 70 L50 70 L50 60 L30 60 L30 70 L20 70 L20 60 L10 60 L10 50 L20 50 L20 40 L10 40 L10 30 L20 30 Z"
        fill="#5DADE2"
      />
      
      {/* Diamond shape on the right */}
      <path
        d="M85 15 L110 40 L85 65 L60 40 Z"
        fill="#5DADE2"
      />
      
      {/* White diamond cutout inside */}
      <path
        d="M85 25 L100 40 L85 55 L70 40 Z"
        fill="white"
      />
    </svg>
  );
};