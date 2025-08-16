import React from 'react';

interface EnhpixLogoProps {
  className?: string;
}

export const EnhpixLogo: React.FC<EnhpixLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <img
      src="/lovable-uploads/ad1b0ff8-75f3-408e-9293-7714a3dca109.png"
      alt="Enhpix Logo"
      className={className}
    />
  );
};