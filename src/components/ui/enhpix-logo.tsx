interface EnhpixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EnhpixLogo = ({ className = '', size = 'md' }: EnhpixLogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="enhpixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        
        {/* Cross part */}
        <rect x="15" y="35" width="25" height="10" fill="url(#enhpixGradient)" />
        <rect x="15" y="55" width="25" height="10" fill="url(#enhpixGradient)" />
        <rect x="30" y="20" width="10" height="60" fill="url(#enhpixGradient)" />
        
        {/* Diamond part */}
        <polygon 
          points="50,30 70,50 50,70 30,50" 
          fill="none" 
          stroke="url(#enhpixGradient)" 
          strokeWidth="8"
        />
        
        {/* Inner diamond */}
        <polygon 
          points="50,38 62,50 50,62 38,50" 
          fill="white"
        />
      </svg>
    </div>
  );
};