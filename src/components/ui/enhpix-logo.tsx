import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Your exact logo design - stepped cross and diamond */}
      
      {/* Left stepped cross */}
      <rect x="90" y="110" width="55" height="55" fill="#5CB3F5" />
      <rect x="145" y="135" width="55" height="55" fill="#5CB3F5" />
      <rect x="90" y="165" width="55" height="55" fill="#5CB3F5" />
      <rect x="90" y="220" width="55" height="55" fill="#5CB3F5" />
      <rect x="145" y="190" width="55" height="55" fill="#5CB3F5" />
      <rect x="200" y="165" width="55" height="55" fill="#5CB3F5" />
      <rect x="145" y="245" width="55" height="55" fill="#5CB3F5" />
      <rect x="90" y="275" width="55" height="55" fill="#5CB3F5" />
      <rect x="35" y="220" width="55" height="55" fill="#5CB3F5" />
      
      {/* Right diamond */}
      <path
        d="M 320 110
           L 375 165
           L 365 175
           L 385 195
           L 375 205
           L 385 225
           L 365 245
           L 375 255
           L 320 310
           L 265 255
           L 275 245
           L 255 225
           L 265 205
           L 255 195
           L 275 175
           L 265 165
           Z"
        fill="#5CB3F5"
      />
      
      {/* White center of diamond */}
      <path
        d="M 320 140
           L 345 165
           L 345 195
           L 355 205
           L 345 215
           L 345 245
           L 320 270
           L 295 245
           L 295 215
           L 285 205
           L 295 195
           L 295 165
           Z"
        fill="white"
      />
    </svg>
  );
};