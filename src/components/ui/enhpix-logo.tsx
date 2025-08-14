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
      {/* Left side - stepped cross shape */}
      <path
        d="M 20 20
           L 50 20
           L 50 35
           L 65 35
           L 65 50
           L 80 50
           L 80 65
           L 65 65
           L 65 80
           L 50 80
           L 50 95
           L 35 95
           L 35 80
           L 20 80
           L 20 65
           L 5 65
           L 5 50
           L 20 50
           L 20 35
           L 5 35
           L 5 20
           L 20 20
           Z"
        fill="#5CB3F5"
      />
      
      {/* Right side - diamond outline with white center */}
      <path
        d="M 120 10
           L 170 40
           L 170 50
           L 180 60
           L 170 70
           L 170 80
           L 120 110
           L 100 90
           L 100 80
           L 90 70
           L 100 60
           L 100 50
           L 100 40
           L 120 10
           Z"
        fill="#5CB3F5"
      />
      
      {/* White diamond center */}
      <path
        d="M 120 30
           L 150 50
           L 150 60
           L 120 90
           L 110 80
           L 110 70
           L 120 60
           L 110 50
           L 110 40
           L 120 30
           Z"
        fill="white"
      />
    </svg>
  );
};