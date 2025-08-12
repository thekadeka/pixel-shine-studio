import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Modern gradient cross design */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#43e7ff" />
        </linearGradient>
      </defs>
      
      {/* Cross shape - more refined and professional */}
      {/* Vertical bar */}
      <rect x="40" y="20" width="20" height="60" rx="4" fill="url(#logoGradient)" />
      
      {/* Horizontal bar */}
      <rect x="20" y="40" width="60" height="20" rx="4" fill="url(#logoGradient)" />
      
      {/* Center highlight circle */}
      <circle cx="50" cy="50" r="12" fill="white" fillOpacity="0.2" />
      <circle cx="50" cy="50" r="8" fill="white" fillOpacity="0.3" />
    </svg>
  );
};