import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left cross - clean and simple */}
      <rect x="8" y="8" width="8" height="8" fill="#5CB3F5" />
      <rect x="16" y="8" width="8" height="8" fill="#5CB3F5" />
      <rect x="8" y="16" width="8" height="8" fill="#5CB3F5" />
      <rect x="16" y="16" width="8" height="8" fill="#5CB3F5" />
      <rect x="24" y="16" width="8" height="8" fill="#5CB3F5" />
      <rect x="8" y="24" width="8" height="8" fill="#5CB3F5" />
      <rect x="16" y="24" width="8" height="8" fill="#5CB3F5" />
      
      {/* Right diamond */}
      <path
        d="M 60 8 
           L 76 20 
           L 60 32 
           L 44 20 
           Z"
        fill="#5CB3F5"
      />
      
      {/* White center */}
      <path
        d="M 60 12 
           L 72 20 
           L 60 28 
           L 48 20 
           Z"
        fill="white"
      />
    </svg>
  );
};